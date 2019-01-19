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
var role = "";
var startDate = "";
var monthWork = "";
var rate = "";
var totalBilled = "";

$("#submit-btn").on("click", function (event) {
    event.preventDefault();
    name = $("#name").val().trim();
    role = $("#role").val().trim();
    startDate = $("#start-date").val().trim();
    rate = $("#monthly-rate").val().trim();
    console.log(name)
    console.log(role)
    database.ref().push({
        name: name,
        role: role,
        startDate: startDate,
        monthWork: monthWork,
        rate: rate,
        totalBilled: totalBilled,
        dateAdded: firebase.database.ServerValue.TIMESTAMP

    })
})
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().role);
    console.log(childSnapshot.val().startDate);
    console.log(childSnapshot.val().rate);
    console.log(childSnapshot.val().dateAdded);
    var randomDate = (childSnapshot.val().startDate);
    var randomFormat = "MM/DD/YYYY";
    var convertedDate = moment(randomDate, randomFormat);

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

