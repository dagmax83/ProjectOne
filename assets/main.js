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

  var dropdown = 
  `<div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Order Status
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <a class="dropdown-item" href="#">At Pharmacy</a>
      <a class="dropdown-item" href="#">On Way</a>
      <a class="dropdown-item" href="#">Delivered</a>
    </div>
  </div>`;

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(name),
    $("<td>").text(deliveryAddress),
    $("<td>").text(perscriptionNumber),
    $("<td>").text(pharmAddress),
    $("<td>").text("30 Minutes"),
    $("<td>").append(dropdown),
  );
  // Append the new row to the table
  $("#employee-table > tbody").append(newRow);
});
