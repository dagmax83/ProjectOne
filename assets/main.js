var config = {
  apiKey: "AIzaSyDOR8iog9sW68qavqnhEDkj5HrM_bR4_vE",
  authDomain: "pharmacydelivery-1ff2b.firebaseapp.com",
  databaseURL: "https://pharmacydelivery-1ff2b.firebaseio.com",
  projectId: "pharmacydelivery-1ff2b",
  storageBucket: "pharmacydelivery-1ff2b.appspot.com",
  messagingSenderId: "666352922440"
};
firebase.initializeApp(config);

var database = firebase.database();
var originLongLat = {};
var city = "";
var state = "";
var resultsFSLat = "";
var resultsFSLong = "";
var resultsGeoLat = "";
var resultsGeoLong = "";
var dist = "";
var loc = "";

$("#add-order-btn").on("click", function(event) {
  event.preventDefault();
  

  var name = $("#name").val().trim();
  var deliveryAddress = $("#delivery-address").val().trim();
  var deliveryCity =  $("#city").val().trim();
  var deliveryState = $("#state").val().trim();
  var deliveryZip  = $("#zip-code").val().trim();
  var perscriptionNumber = $("#perscription-number").val().trim();
  var newEntry = {
    name: name,
    deliveryAddress: deliveryAddress,
    perscriptionNumber: perscriptionNumber,
  };

  database.ref("/data").push(newEntry);
  $("#name").val("");
  $("#delivery-address").val("");
  $("#perscriptionNumber").val("");
  $("#city").val("");
  $("#state").val("");
  $("#zip-code").val("");

  var queryURLGeo = "https://maps.googleapis.com/maps/api/geocode/json?address=" + deliveryAddress + ",+" + deliveryCity + ",+" + deliveryState + "&key=AIzaSyCUfu2Dg7gUf6OwezymCUo-QmxOC47Bh2k";
$.ajax({
  url: queryURLGeo,
  method: "GET"
})
  .then(function(response) {
    resultsGeoLat = response.results[0].geometry.location.lat;
    resultsGeoLong = response.results[0].geometry.location.lng;
    originLongLat.lat = resultsGeoLat;
    originLongLat.lng = resultsGeoLong;
    fourSquareCall();
}); 

 function fourSquareCall() {
      var jqueryFS = "https://api.foursquare.com/v2/venues/search?client_id=CPMQWA3FSBQ05XME3HFVCNFU0Q2H5IQJFNSTV0M54UZMAKGG&client_secret=P3DFOZPMDTHVLJU5TFJLBRUKL4ZTVNZBW1GYRV3JK4GGBZFM&ll=" + originLongLat.lat + "," + originLongLat.lng + "1&query=Pharmacy&limit=1&v=20181113";
      $.ajax({
        url: jqueryFS,
        method: "GET"
      }).then(function(responseFS) {
        console.log(responseFS);
           resultsFSLat = responseFS.response.venues[0].location.labeledLatLngs[0].lat;
           resultsFSLong = responseFS.response.venues[0].location.labeledLatLngs[0].lng;
           $("#pharm-address").text(responseFS.response.venues[0].location.address);
      }); 
    }
});

database.ref("/data").on("child_added", function(childSnapshot) {
  var name = childSnapshot.val().name;
  var deliveryAddress = childSnapshot.val().deliveryAddress;
  var perscriptionNumber = childSnapshot.val().perscriptionNumber;

  var newRow = $("<tr>").append(
    $("<td>").text(name),
    $("<td>").text(deliveryAddress),
    $("<td>").text(perscriptionNumber),
  );
  $("#employee-table > tbody").append(newRow);
});

$("#status-btn").on("click", function(event) {
  event.preventDefault();
  googleApiCall();


 });
function googleApiCall () {
      var queryURL = "https://cors-ut-bootcamp.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + resultsFSLat + "," + resultsFSLong + "&destinations="+ originLongLat.lat + ","+ originLongLat.lng +"&key=AIzaSyCpuqPaRoQb2Nsuxqyb6ZQtG9uiZdQiRYQ";
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(results) {

          var today = new Date();
          var time = today.getHours() + ":" + today.getMinutes();
          dist = results.rows[0].elements[0].duration.text;
          $("#time").text(time);
          $("#eta").text(dist);


  
  var el = $(this);
 
  if(el.text() === "Processing"){
    el.text("Enroute");
    $("#status").text("Enroute");
  } else if(el.text() === "Enroute"){
    el.text("Delivered");
    $("#status").text("Delivered");
  } else if("Delivered"){
    el.text("Processing");
    $("#status").text("Processing");
  }
      });     
    };
