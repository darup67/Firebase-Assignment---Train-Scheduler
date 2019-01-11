var config = {
    apiKey: "AIzaSyA4ytXPFchzTpXeFYCH0Yj-RAmLJ09Gsc8",
    authDomain: "train-schedule-a2ea9.firebaseapp.com",
    databaseURL: "https://train-schedule-a2ea9.firebaseio.com/",
    projectId: "train-schedule-a2ea9",
    storageBucket: "train-schedule-a2ea9.appspot.com",
    messagingSenderId: "623782715835"
};
firebase.initializeApp(config);

var database = firebase.database();

var trainNumber;
var trainLine;
var trainDestination;
var trainDeparture;
var nextTrain;
var minutesAway;
var trainFrequency;
var trainTiming;
var trainPlatform;
var currentTime = moment();
console.log('CURRENT TIME: ' + moment(currentTime).format('hh:mm:ss A'));



var model = {

    pushNewTrain: () => {


        database.ref().push({

            trainDeparture: trainDeparture,
            trainDestination: trainDestination,
            trainFrequency: trainFrequency,
            trainLine: trainLine,
            trainNumber: trainNumber,
            trainPlatform: trainPlatform,
            dateAdded: firebase.database.ServerValue.TIMESTAMP

        });

        model.pullChildFromDatabase();

    },

    pullChildFromDatabase: () => {

        var filter = database.ref().orderByChild("dateAdded").limitToLast(1)

        filter.once("child_added", function(childSnapshot) {

            trainNumber = childSnapshot.val().trainNumber
            trainLine = childSnapshot.val().trainLine
            trainDestination = childSnapshot.val().trainDestination
            trainDeparture = childSnapshot.val().trainDeparture
            trainFrequency = childSnapshot.val().trainFrequency
            trainPlatform = childSnapshot.val().trainPlatform



            view.updateTrainScheduleTable();
        });

    },

    initialDatabasePull: () => {

        database.ref().on("value", function(snapshot) {
            var trains = snapshot.val();



            $('#train-schedule-body').empty();

            for (var index in trains) {
                trainNumber = trains[index].trainNumber
                trainLine = trains[index].trainLine
                trainDestination = trains[index].trainDestination
                trainDeparture = trains[index].trainDeparture
                trainFrequency = trains[index].trainFrequency
                trainPlatform = trains[index].trainPlatform


                controller.nextArrival();
                controller.minutesAway();
                view.updateTrainScheduleTable();
            };

        }, function(errorObject) {
            console.log("Errors handled: " + errorObject.code);

        });
    }

}