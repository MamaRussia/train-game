$(document).ready(function(){

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDP4smlVV8LH5Xt5S5yLA6PvG3EXx6vwvQ",
    authDomain: "choo-choo-train-times.firebaseapp.com",
    databaseURL: "https://choo-choo-train-times.firebaseio.com",
    projectId: "choo-choo-train-times",
    storageBucket: "choo-choo-train-times.appspot.com",
    messagingSenderId: "431069025174"
  };
  firebase.initializeApp(config);
  
  // Create a variable to reference the database
  var database = firebase.database();

  var trainName = "";
  var destination = "";
  var timeArrives = "";
  var frequency = "";

//   database.ref().on("value", function(snapshot) {
//     // We are now inside our .on function...
  
//     // Console.log the "snapshot" value (a point-in-time representation of the database)
//     console.log(snapshot.val());
//     // This "snapshot" allows the page to get the most current values in firebase.
  
//     // Change the value of our clickCounter to match the value in the database
//     trainName = snapshot.val().trainName;
//     destination = snapshot.val().destination;
//     timeArrives = snapshot.val().timeArrives;
//     frequency = snapshot.val().frequency;
  
//     // Console Log the value of the clickCounter
//     // console.log(clickCounter);
  
//     // Change the HTML using jQuery to reflect the updated clickCounter value
//     $("#click-value").text(clickCounter);
//     // Alternate solution to the above line
//     // $("#click-value").html(clickCounter);
  
//   // If any errors are experienced, log them to console.
//   }, function(errorObject) {
//     console.log("The read failed: " + errorObject.code);
//   });

      // Assumptions
    //   var tFrequency = 3;

      // Time is 3:30 AM
      var firstTime = "03:30";

      $("#add-train").on("click", function(event) {
        event.preventDefault();

        trainName = $("#train-name").val().trim();
        // destination = $("#destination").val();
        // timeArrives = $("#time-arrives").val();
        // frequency = $("#frequency").val();

      // First Time (pushed back 1 year to make sure it comes before current time)
      var firstTimeConverted = moment(timeArrives, "HH:mm").subtract(1, "years");
      console.log(firstTimeConverted);
  
      // Current Time
      var currentTime = moment();
      console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  
      // Difference between the times
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      console.log("DIFFERENCE IN TIME: " + diffTime);
  
      // Time apart (remainder)
      var tRemainder = diffTime % frequency;
      console.log(tRemainder);
  
      // Minute Until Train
      var tMinutesTillTrain = frequency - tRemainder;
      console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
  
      // Next Train
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
     
      // Code for the push
      database.ref().push({
        trainName: trainName,
        destination: destination,
        timeArrives: timeArrives,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });


    });

}) 