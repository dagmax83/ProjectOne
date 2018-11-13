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

// 2. Button for adding Employees
$("#add-order-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var name = $("#name").val().trim();
  var deliveryAddress = $("#delivery-address").val().trim();
  var perscriptionNumber = $("#perscription-number").val().trim();

  // Creates local "temporary" object for holding employee data
  var newEntry = {
    name: name,
    deliveryAddress: deliveryAddress,
    perscriptionNumber: perscriptionNumber,
  };

  database.ref("/data").push(newEntry);
  alert("Entry successfully added");
  $("#name").val("");
  $("#deliveryAddress").val("");
  $("#perscriptionNumber").val("");
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


  //Foursquare API
  var jqueryFS = "https://api.foursquare.com/v2/venues/search?client_id=CPMQWA3FSBQ05XME3HFVCNFU0Q2H5IQJFNSTV0M54UZMAKGG&client_secret=P3DFOZPMDTHVLJU5TFJLBRUKL4ZTVNZBW1GYRV3JK4GGBZFM&near=Austin,TX&query=Pharmacy&limit=1&v=20181113";
  
  $.ajax({
    url: jqueryFS,
    method: "GET"
  }).then(function(responseFS) {
     // console.log(responseFS);
  
      
      var resultsFS = responseFS;
      console.log(resultsFS);
  
   // your code goes here.
    
    
  }); 



// api call,
var queryURL = "https://cors-ut-bootcamp.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?origins=Vancouver+BC|Seattle&destinations=San+Francisco|Victoria+BC&key=AIzaSyCpuqPaRoQb2Nsuxqyb6ZQtG9uiZdQiRYQ";

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
    // console.log(results);

 //your code goes here.
  
  
}); 
