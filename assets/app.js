var config = {
    apiKey: "AIzaSyD74oRWAl5earUTQcMTaDf4-Ui1fzSDDtw",
    authDomain: "novemberclass-6f532.firebaseapp.com",
    databaseURL: "https://novemberclass-6f532.firebaseio.com",
    projectId: "novemberclass-6f532",
    storageBucket: "novemberclass-6f532.appspot.com",
    messagingSenderId: "343819748521"
};
firebase.initializeApp(config);
var database = firebase.database();


$("#submit-btn").on("click", function (event) {

    event.preventDefault();
    var name = $("#name").val().trim();
    var destination = $("#destination").val().trim();
    var frequency = $("#frequency").val().trim();
    var firstTime = $("#firstTime").val().trim();
    console.log(name);
    console.log(destination);
    console.log(frequency);
    console.log(firstTime);



    database.ref().push({
        name: name,
        destination: destination,
        frequency: frequency,
        firstTime: firstTime,

    })
})
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());
    var tFrequency = childSnapshot.val().frequency;
    firstTime = moment(childSnapshot.val().firstTime, "hhmm").format("hh:mm");
    console.log(firstTime)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    var diffTime = moment().diff((firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


    console.log(tFrequency)

    $("#train-list").append("<tr><td>" + childSnapshot.val().name +
        "</td><td>" + childSnapshot.val().destination +
        "</td><td>" + childSnapshot.val().frequency +

        "</td><td>" + (nextTrain).format("hh:mm") +
        "</td><td>" + tMinutesTillTrain +
        "</td></tr>");
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
