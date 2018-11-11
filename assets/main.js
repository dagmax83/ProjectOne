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
  var pharmAddress = $("#pharmacy-address").val().trim();

  // Creates local "temporary" object for holding employee data
  var newEntry = {
    name: name,
    deliveryAddress: deliveryAddress,
    perscriptionNumber: perscriptionNumber,
    pharmAddress: pharmAddress
  };
  console.log(newEntry);

  // Uploads employee data to the database
  database.ref().push(newEntry);
  // Logs everything to console
  console.log(newEntry.name);
  console.log(newEntry.deliveryAddress);
  console.log(newEntry.perscriptionNumber);
  console.log(newEntry.pharmAddress);

  alert("Entry successfully added");
  // Clears all of the text-boxes
  $("#name").val("");
  $("#deliveryAddress").val("");
  $("#perscriptionNumber").val("");
  $("#pharmAddress").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());
  // Store everything into a variable.
  var name = childSnapshot.val().name;
  var deliveryAddress = childSnapshot.val().deliveryAddress;
  var perscriptionNumber = childSnapshot.val().perscriptionNumber;
  var pharmAddress = childSnapshot.val().pharmAddress;

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(name),
    $("<td>").text(deliveryAddress),
    $("<td>").text(perscriptionNumber),
    $("<td>").text(pharmAddress),
  );
  // Append the new row to the table
  $("#employee-table > tbody").append(newRow);
});

// Performing our AJAX GET request
// var delivery = ["ordered", "pickup", "delivered"]
var results = response.rows[0].elements[1].duration.text;
var eta = $("<p>").text(results);

$.ajax({
  url: queryURL,
  method: "GET"
})
  // After the data comes back from the API
  .then(function(results) {
    
    // Dago - use resutls for ETA var results = response.rows[0].elements[1].duration.text;
    // console.log(results);
    results.append(eta);
  })
 // your code goes here.
  //  $(deliveryAddress + pharmAddress)
// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case