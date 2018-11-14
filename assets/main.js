// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
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

// 2. Button for adding Employees
$("#add-order-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var name = $("#name").val().trim();
  var deliveryAddress = $("#delivery-address").val().trim();

  var deliveryCity =  $("#city").val().trim();
  var deliveryState = $("#state").val().trim();
  var deliveryZip  = $("#zip-code").val().trim();
  var perscriptionNumber = $("#perscription-number").val().trim();

 
  // Creates local "temporary" object for holding employee data
  var newEntry = {
    name: name,
    deliveryAddress: deliveryAddress,
    perscriptionNumber: perscriptionNumber,
  };

  database.ref("/data").push(newEntry);
  //alert("Entry successfully added");
  $("#name").val("");
  $("#deliveryAddress").val("");
  $("#perscriptionNumber").val("");

  var queryURLGeo = "https://maps.googleapis.com/maps/api/geocode/json?address=" + deliveryAddress + ",+" + deliveryCity + ",+" + deliveryState + "&key=AIzaSyCUfu2Dg7gUf6OwezymCUo-QmxOC47Bh2k";

$.ajax({
  url: queryURLGeo,
  method: "GET"
})
  // After the data comes back from the API
  .then(function(response) {
    // console.log(response);

    // Dago - use resutls for ETA 
    var resultsGeoLat = response.results[0].geometry.location.lat;
    var resultsGeoLong = response.results[0].geometry.location.lng;
    originLongLat.lat = resultsGeoLat;
    originLongLat.lng = resultsGeoLong;

    console.log(originLongLat);

}); 
//console.log(originLongLat);
console.log("_________________");

//console.log(originLongLat.lat);
 //Foursquare API
  var jqueryFS = "https://api.foursquare.com/v2/venues/search?client_id=CPMQWA3FSBQ05XME3HFVCNFU0Q2H5IQJFNSTV0M54UZMAKGG&client_secret=P3DFOZPMDTHVLJU5TFJLBRUKL4ZTVNZBW1GYRV3JK4GGBZFM&near=" + deliveryCity + "+" + deliveryState + "&query=Pharmacy&limit=1&v=20181113";

  $.ajax({
    url: jqueryFS,
    method: "GET"
  }).then(function(responseFS) {
     // console.log(responseFS);
  
      // lat output
      var resultsFSLat = responseFS.response.venues[0].location.labeledLatLngs[0].lat;
    // long output
      var resultsFSLong = responseFS.response.venues[0].location.labeledLatLngs[0].lng;
     
      originLongLat.lat = resultsFSLat;
      originLongLat.long =  resultsFSLong;
      // console.log(resultsFSLat);
      // console.log(resultsFSLong);

   
   // fs response needs to land in  var origin = {lat, long} to be called by the google api
    
    
  }); 
 
});

database.ref("/data").on("child_added", function(childSnapshot) {
  var name = childSnapshot.val().name;
  var deliveryAddress = childSnapshot.val().deliveryAddress;
  var perscriptionNumber = childSnapshot.val().perscriptionNumber;

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(name),
    $("<td>").text(deliveryAddress),
    $("<td>").text(perscriptionNumber),
  );
  // Append the new row to the table
  $("#employee-table > tbody").append(newRow);
});


 
  


// api call, needs to take in the FS api output in the query bellow
var queryURL = "https://cors-ut-bootcamp.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?origins=41.43206,-81.38992&destinations=San+Francisco|Victoria+BC&key=AIzaSyCpuqPaRoQb2Nsuxqyb6ZQtG9uiZdQiRYQ";
//origins=41.43206,-81.38992|-33.86748,151.20699
// Performing our AJAX GET request
$.ajax({
  url: queryURL,
  method: "GET"
})
  // After the data comes back from the API
  .then(function(response) {
    // console.log(response);

    // Dago - use resutls for ETA 
    var results = response.rows[0].elements[1].duration.text;
    //console.log(results);

 //your code goes here.
  
  
}); 
