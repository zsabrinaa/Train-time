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
var name = "";
var destination = "";
var nextArrival = "";
var minAway = "";

$("#submit-btn").on("click", function (event) {
    event.preventDefault();
    name = $("#name").val().trim();
    destination = $("#destination").val().trim();
    frequency  = $("#frequency ").val().trim();
    nextArrival = $("#firstTime").val().trim();
    minAway = $("#frequency ").val().trim();
    console.log(name)
    console.log(role)
    database.ref().push({
        name: name,
        destination: destination,
        nextArrival:nextArrival,
        frequency: frequency,
        minAway:minAway,
        dateAdded: firebase.database.ServerValue.TIMESTAMP

    })
})
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTime);
    console.log(childSnapshot.val().frequency);
    console.log(childSnapshot.val().dateAdded);
    var randomTime = (childSnapshot.val().firstTime);
    var randomFormatTime = "HH:mm";
    var convertedTime = moment(randomTime, randomFormatTime);

    console.log(convertedDate.diff(moment(), "months"));

    $("#member-list").append("<tr><td>" + childSnapshot.val().name + 
    "</td><td>" + childSnapshot.val().role + 
    "</td><td>" + childSnapshot.val().startDate + 
    "</td><td>" + (moment().diff(randomDate,"months"))+
    "</td><td>" + childSnapshot.val().rate + 
    "</td><td>" + childSnapshot.val().totalBilled+ 
    "</td></tr>");
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
//   database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
//     // Change the HTML to reflect
//     $("#name-display").text(snapshot.val().name);
//     $("#email-display").text(snapshot.val().email);
//     $("#age-display").text(snapshot.val().age);
//     $("#comment-display").text(snapshot.val().comment);
//   });

