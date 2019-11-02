$("document").ready(function() {
  function displayTrainSchedule(resultsObj) {
    // * Function to display the Train Schdule

    var tBody = $(".trainSchedule");
    var tRow = $("<tr>");

    var topSearchNameDiv = $("<td>").text(resultsObj[0]);
    var topSearchCountDiv = $("<td>").text(resultsObj[1] / 3);

    tRow.append(topSearchNameDiv, topSearchCountDiv);
    tBody.append(tRow);
  }

  function updateFireBase(resultsObj) {
    // * writing the itunesSearchResults to the DB = we use this to track artist searched later
    database.ref("/trains").push({
      itunesSearchResults: resultsObj,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
  }

  function addTrain() {
    // TODO add docuemnt.ready function wrapper to get passed click issue
    console.log("in addTrain");
    console.log($(".btn"));

    $(document).ready(function() {
      $(".btn").on("click", function(event) {
        console.log("Click event successful");
        event.preventDefault();
        // Get the input values
        var trainName = $("#inputTrainName")
          .val()
          .trim();
        var destination = $("#inputDestination")
          .val()
          .trim();
        var trainTime = $("#inputTrainTime")
          .val()
          .trim();
        var frequency = $("#inputFrequency")
          .val()
          .trim();

        database.ref().push({
          trainName: trainName,
          destination: destination,
          trainTime: trainTime,
          frequency: frequency
        });
      });
    });
    // $(".btn").on("click", function(event) {
    //   console.log("Click event successful");
    //   event.preventDefault();
    //   // Get the input values
    //   var trainName = $("#inputTrainName")
    //     .val()
    //     .trim();
    //   var destination = $("#inputDestination")
    //     .val()
    //     .trim();
    //   var trainTime = $("#inputTrainTime")
    //     .val()
    //     .trim();
    //   var frequency = $("#inputFrequency")
    //     .val()
    //     .trim();

    //   database.ref().push({
    //     trainName: trainName,
    //     destination: destination,
    //     trainTime: trainTime,
    //     frequency: frequency
    //   });
    // });
  }

  console.log("In trainTime.js");
  addTrain();
});
