// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCqkPcuZCI__n_EZ8HaFZz9VGkwoDFNeDc",
    authDomain: "findmylocation-50dc6.firebaseapp.com",
    databaseURL: "https://findmylocation-50dc6.firebaseio.com",
    projectId: "findmylocation-50dc6",
    storageBucket: "findmylocation-50dc6.appspot.com",
    messagingSenderId: "616972512534"
  };
  firebase.initializeApp(config);


  var database = firebase.database();


  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});


firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});

firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});



