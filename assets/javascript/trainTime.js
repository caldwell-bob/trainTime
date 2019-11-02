var config = {
  apiKey: "AIzaSyDcGHWKNOwTZf_QGUGl6wO-Zrtf_qoaaYU",
  authDomain: "traintime-b14b2.firebaseapp.com",
  databaseURL: "https://traintime-b14b2.firebaseio.com",
  storageBucket: "traintime-b14b2.appspot.com"
};

firebase.initializeApp(config);

var database = firebase.database();

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
  }

  function addTrainRow(dbDump) {
    console.log("in addTrainRow");
    console.log("dbDump : " + JSON.stringify(dbDump));
    var row = $("<tr>");
    var train = $("<td>");
    var destination = $("<td>");
    var time = $("<td>");
    var frequency = $("<td>");
    var nextTrain = $("<td>");
    var firstTrain = moment(dbDump.trainTime, "HH:mm").subtract(1, "years");

    console.log("The first train starts : " + firstTrain);
    var timeNow = moment().format("LT");
    console.log("timeNow : " + timeNow);

    var diffTime = moment().diff(moment(firstTrain), "minutes");
    console.log("diffTime : " + diffTime);
    var tRemainder = diffTime % dbDump.trainFrequency;
    console.log("tRemainder : " + tRemainder);
    var tMinutesTillTrain = dbDump.trainFrequency - tRemainder;
    console.log("tMinutesTillTrain : " + tMinutesTillTrain);
    var nextTrainTime = moment().add(tMinutesTillTrain, "minutes");
    console.log("nextTrainTime : " + nextTrainTime);
    var nextTrainFormat = moment(nextTrainTime).format("LT");

    train.text(dbDump.trainName);
    destination.text(dbDump.destination);
    time.text(nextTrainFormat);
    frequency.text(dbDump.frequency);
    nextTrain.text(tMinutesTillTrain);
    row.append(train, destination, frequency, time, nextTrain);
    $(".table").append(row);
  }

  database.ref().on("child_added", function(snapshot) {
    console.log("child done been added");
    var dbData = snapshot.val();
    console.log(dbData);
    addTrainRow(dbData);
  });

  console.log("In trainTime.js");
  addTrain();
});
