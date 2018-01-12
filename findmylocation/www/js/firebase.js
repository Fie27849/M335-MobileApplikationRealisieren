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

  //auth


      function toggleSignIn() {
      if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
      } else {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if (email.length < 4) {
          alert('Please enter an email address.');
          return;
        }
        if (password.length < 4) {
          alert('Please enter a password.');
          return;
        }
        // Sign in with email and pass.
        // [START authwithemail]
        firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
          document.getElementById('quickstart-sign-in').disabled = false;
          // [END_EXCLUDE]
        });
        // [END authwithemail]
      }
      console.log('sign in');
    }

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        (window.location = "#home")
      } else {
        console.log('no user');
      }
    });
    /**
     * Handles the sign up button press.
     */
    function handleSignUp() {
      var email = document.getElementById('mailNewAccount').value;
      var password = document.getElementById('newnewAccountPW').value;
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }
      // Sign in with email and pass.
      // [START createwithemail]
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
      // [END createwithemail]
    }
    /**
     * Sends an email verification to the user.
     */
    function sendEmailVerification() {
      // [START sendemailverification]
      firebase.auth().currentUser.sendEmailVerification().then(function() {
        // Email Verification sent!
        // [START_EXCLUDE]
        alert('Email Verification Sent!');
        // [END_EXCLUDE]
      });
      // [END sendemailverification]
    }
    function sendPasswordReset() {
      var email = document.getElementById('email').value;
      // [START sendpasswordemail]
      firebase.auth().sendPasswordResetEmail(email).then(function() {
        // Password Reset Email Sent!
        // [START_EXCLUDE]
        alert('Password Reset Email Sent!');
        // [END_EXCLUDE]
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/invalid-email') {
          alert(errorMessage);
        } else if (errorCode == 'auth/user-not-found') {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
      // [END sendpasswordemail];
    }

    function addlist(){

      var firebaseRef = firebase.database().ref();

      var place = document.getElementById('nameNewPlace').value;

      firebaseRef.push().set(place);

     // (window.location = "#home");

    }

    function readlist(){

      var divList = document.getElementById('liste').innerHTML = "";

      var firebaseRef = firebase.database().ref();
      divList = document.getElementById('liste');



      firebaseRef.on('child_added', snap => {
          const button =document.createElement('button');
          button.innerText = snap.val();
          button.id =snap.key;
          divList.appendChild(button);
          var buttonid = snap.key;
          document.getElementById(buttonid).setAttribute("onclick", "detail(" + buttonid + ");");

        //  alert('Standort wurde gespeichert');


      });

    }


    function detail(id){

      window.location = "#home";

      var divloctitel = document.getElementById('loctitel').innerHTML = "";

      var firebaseRef = firebase.database().ref(id);
      divloctitel = document.getElementById('loctitel');

      var valueFromID = firebaseRef.on('value', snap => {
        const h1 =document.createElement('h1');
        divloctitel.appendChild(h1);
      });

    }

  


    /**
     * initApp handles setting up UI event listeners and registering Firebase auth listeners:
     *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
     *    out, and that is where we update the UI.
     
    function initApp() {
      // Listening for auth state changes.
      // [START authstatelistener]
      firebase.auth().onAuthStateChanged(function(user) {
        // [START_EXCLUDE silent]
        document.getElementById('quickstart-verify-email').disabled = true;
        // [END_EXCLUDE]
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // [START_EXCLUDE]
          document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
          document.getElementById('quickstart-sign-in').textContent = 'Sign out';
          document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
          if (!emailVerified) {
            document.getElementById('quickstart-verify-email').disabled = false;
          }
          // [END_EXCLUDE]
        } else {
          // User is signed out.
          // [START_EXCLUDE]
          document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
          document.getElementById('quickstart-sign-in').textContent = 'Sign in';
          document.getElementById('quickstart-account-details').textContent = 'null';
          // [END_EXCLUDE]
        }
        // [START_EXCLUDE silent]
        document.getElementById('quickstart-sign-in').disabled = false;
        // [END_EXCLUDE]
      });
      // [END authstatelistener]
      document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
      document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
      document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
      document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
    }
    window.onload = function() {
      initApp();
    };
   

  //write
  const myUserId = firebase.auth().currentUser.uid;

  function writeNewLocation(location, lat, lon) {
    // A post entry.
    var postData = {
      uid: myUserId,
      location: location,
      lan: lon
    };

    var newLocationKey = firebase.database().ref().child('location').push().key;

    var updates = {};
      updates['/user/' + uid + '/' + newLocationKey] = postData;

      return firebase.database().ref().update(updates);


  //read

  // get elements
  const preObject = document.getElementById('object');
  const ulList = document.getElementById('list');


  //create reference
  const dbReflocation = firebase.database().ref('location/' + myUserId);
  const dbRefLat = dbRefObject.child('lat');
  const dbRefLon = dbRefObject.child('lon');

  // Sync object changes
  dbRefLocation.on('value', snap => {

  });

  // Sync list changes
  dbReflocation.on('child_added', snap => {

    const li = document.getElementById('li');
    li.innerText = snap.val();
    li.id = snap.key;
    ulList.appendChild(li);

  });

  dbReflocation.on('child_changed', snap => {

    const liChanged = document.getElementById(snap.key);
    liChanged.innerText = snap.val();

  });

  dbReflocation.on('child_removed', snap => {

    const liToRemoved = document.getElementById(snap.key);
    liToRemoved.remove();

  });

  //list

*/
 
 //write

  //read

  // get elements

 //read

 



function savePosition(lat, lon){

  var userId = firebase.auth().currentUser.uid;
  var location = document.getElementById('location').value;

  // A post entry.
    var postData = {
      uid: userId,
      location: location,
      lan: lon
    };

    var newLocationKey = firebase.database().ref().child('location').push().key;

    var updates = {};
      updates['/user/' + uid + '/' + newLocationKey] = postData;

      return firebase.database().ref().update(updates);

      window.location = "#home";
}

