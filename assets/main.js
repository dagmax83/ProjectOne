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
