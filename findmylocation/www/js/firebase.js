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

    function addlist(pos){

      alert('Standort wurde gespeichert');

      var userId = firebase.auth().currentUser.uid;

      var firebaseRef = firebase.database().ref('/users/' + userId);
      var firebaseloc = firebaseRef.child('location');
      
      

      var place = document.getElementById('nameNewPlace').value;

      var firebaseloc2 = firebaseloc.child(place);

      firebaseloc2.set(pos);

    }

    function readlist(){

      var userId = firebase.auth().currentUser.uid;

      var divList = document.getElementById('liste').innerHTML = "";
      var i = 1 ;

      var firebaseRef = firebase.database().ref('/users/' + userId);
      var firebaseloc = firebaseRef.child('location');
      divList = document.getElementById('liste');
      divList2 = document.getElementById('liste');



      firebaseloc.on('child_added', snap => {


          const button =document.createElement('button');
          button.innerText = snap.key;
          button.id =snap.key;
          divList.appendChild(button);
          var key = snap.key;
          var buttonid = snap.key;
          document.getElementById(buttonid).setAttribute("onclick", "detail('" + key + "');");
          console.log(buttonid);

         
          const button2 =document.createElement('button');
          button2.innerText = "delete";
          button2.id = "delete" + i;
          divList.appendChild(button2);
          var key = snap.key;
          var buttonid = "delete" + i;;
          document.getElementById(buttonid).setAttribute("onclick", "removeplace('" + key + "');");

          i++;

      });

    }

    var id;
    var titel;


    function detail(id){

      this.id = id;
      this.titel = titel

      window.location = "#detail1";

      var latdata;
      var lngdata;
      var titel;

      var userId = firebase.auth().currentUser.uid;

      var firebaseRef = firebase.database().ref('/users/' + userId);
      var firebaseloc = firebaseRef.child('location/' + id);

      var lat = firebaseloc.child('lat/');
      var lng = firebaseloc.child('lng/');


      var divloctitel = document.getElementById('loctitel').innerHTML = "";

      divloctitel = document.getElementById('loctitel');


      firebaseloc.on('value', snap => {
        titel = snap.key;
        divloctitel.innerText = titel;
      });

      this.titel = titel

      lat.on('value', snap => {
        latdata = snap.val();
      });

      lng.on('value', snap => {
        lngdata = snap.val();
      });

      console.log(latdata);

      var pos = {
              lat: latdata,
              lng: lngdata
            };

      console.log(pos);

      initMap(pos, titel);

    }

    function removeplace(id){

      var userId = firebase.auth().currentUser.uid;

      var firebaseRef = firebase.database().ref('/users/' + userId);
      var firebaseloc = firebaseRef.child('location/' + id);

      console.log(firebaseloc);

      firebaseloc.remove();

      alert('Standort wurde gelöscht');

      readlist();

    }

    function detail2(){

      console.log(this.titel);

      window.location = "#detail2";

      var divloctitel2 = document.getElementById('loctitel2').innerHTML = "";

      divloctitel2 = document.getElementById('loctitel2');

      divloctitel2.innerText = this.titel;



      routemap(this.titel);

    }









