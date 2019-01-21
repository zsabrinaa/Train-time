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
    database.ref().push({
        name: name,
        destination: destination,
        frequency: frequency,
        firstTime: firstTime,
    })
})
database.ref().on("child_added", function (childSnapshot) {
    var tFrequency = childSnapshot.val().frequency;
    firstTime = moment(childSnapshot.val().firstTime, "hhmm").format("hh:mm");
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff((firstTimeConverted), "minutes");
    var tRemainder = diffTime % tFrequency;
    var tMinutesTillTrain = tFrequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    $("#train-list").append("<tr><td>" + childSnapshot.val().name +
        "</td><td>" + childSnapshot.val().destination +
        "</td><td>" + childSnapshot.val().frequency +
        "</td><td>" + (nextTrain).format("hh:mm") +
        "</td><td>" + tMinutesTillTrain +
        "</td></tr>");
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
