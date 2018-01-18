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

  //authentifizierung

      // Ein und ausloggen
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
        
        // Wenn ausgeloggt und Daten korrekt wird authentifizierung gestartet
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

    //Bei Änderung des Authentifizierungs Status wird angemeldet und auf die HomeSeite weitergeleitet
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        (window.location = "#home")
      } else {
        console.log('no user');
      }
    });
   

    //Registrierung mit E-Mail und Passwort
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
      // Wenn Daten korrekt wird der user erstellt
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
    // Passwort reset, wenn der User vorhanden ist wird ein Mail gesendet
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

    // Standort in der Datenbank speichern
    function addlist(pos){

      console.log(performance.now());

      $('.loading').removeClass('hidden');

      //User id in Variable speichern
      var userId = firebase.auth().currentUser.uid;

      //Pfad in der Datenbank in Variable speichern
      var firebaseRef = firebase.database().ref('/users/' + userId);
      var firebaseloc = firebaseRef.child('location');
      
      var place = document.getElementById('nameNewPlace').value;

      // Name der Location in Datenbank speichern
      var firebaseloc2 = firebaseloc.child(place);

      //Geodaten speichern in Datenbank
      firebaseloc2.set(pos);

      alert('Standort wurde gespeichert');

      $('.loading').addClass('hidden');
      window.location.reload(true);
    }

    //Daten aus der Datenbank lesen und Button erstellen
    function readlist(){

      var userId = firebase.auth().currentUser.uid;

      var divList = document.getElementById('liste').innerHTML = "";
      var i = 1 ;

      //Pfad der Datenbank
      var firebaseRef = firebase.database().ref('/users/' + userId);
      var firebaseloc = firebaseRef.child('location');
      divList = document.getElementById('liste');
      divList2 = document.getElementById('liste');

      //Snapshot der Datenbank erstellen und Daten auslesen
      firebaseloc.on('child_added', snap => {

          //Delete Button mit onclick erstellen und Location id mitgeben
          const button2 =document.createElement('button');
          button2.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>';
          button2.id = "delete" + i;
          divList.appendChild(button2);
          var key = snap.key;
          var buttonid = "delete" + i;;
          document.getElementById(buttonid).setAttribute("onclick", "removeplace('" + key + "');");
          document.getElementById(buttonid).setAttribute("class", "deletePlace");

          //Location Button für Liste erstellen, Locationnamen und id mitgeben
          const button =document.createElement('button');
          button.innerHTML = '<i class="fa fa-info" aria-hidden="true"></i> ' + snap.key;
          button.id =snap.key;
          divList.appendChild(button);
          var key = snap.key;
          var buttonid = snap.key;
          document.getElementById(buttonid).setAttribute("onclick", "detail('" + key + "');");
          document.getElementById(buttonid).setAttribute("class", "listPlace");
          console.log(buttonid);

          i++;
      });

    }

    var id;
    var titel;
    var selectedMode;

    //Funktion für doe Detailansicht
    function detail(id){

      this.id = id;
      this.titel = titel

      window.location = "#detail1";

      var latdata;
      var lngdata;
      var titel;

      //UserID aus Datenbank lesen
      var userId = firebase.auth().currentUser.uid;

      //Pfad zu User Daten (Location)
      var firebaseRef = firebase.database().ref('/users/' + userId);
      var firebaseloc = firebaseRef.child('location/' + id);

      var lat = firebaseloc.child('lat/');
      var lng = firebaseloc.child('lng/');

      //Titel setzen mit Location Name für Detailseite
      var divloctitel = document.getElementById('loctitel').innerHTML = "";

      divloctitel = document.getElementById('loctitel');


      firebaseloc.on('value', snap => {
        titel = snap.key;
        divloctitel.innerText = titel;
      });

      this.titel = titel

      //lat und lng aus Datenban lesen
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

      console.log('detail' + pos);

      //Funktion für Map
      initMap(pos, titel);
    }

    //Funktion für die Löschung einer Location aus der Liste
    function removeplace(id){

      //UserID aus Datenbank lesen
      var userId = firebase.auth().currentUser.uid;

      //Pfad zu Location Einträge
      var firebaseRef = firebase.database().ref('/users/' + userId);
      var firebaseloc = firebaseRef.child('location/' + id);

      console.log(firebaseloc);

      //Eintrag mit übergeben Location ID löschen
      firebaseloc.remove();

      alert('Standort wurde gelöscht');

      //Nach Löschung Liste neu laden
      readlist();
    }

    //Funktion für Ansicht Routenplanung
    function detail2(){

      //Gewünschte Reise Methode in Globaler Variable zwischenspeichern
      selectedMode = document.getElementById('mode').value;

      //Gewünschte Fortbewegungsmethode in String für Titel Speichern
      if(this.selectedMode == 'DRIVING'){
      this.selectedMode = 'Fortbewegungsart: Auto';
      }
      if(this.selectedMode == 'WALKING'){
        this.selectedMode = 'Fortbewegungsart: Gehen';
      }
      if(this.selectedMode == 'BICYCLING'){
        this.selectedMode = 'Fortbewegungsart: Velo';
      }
      if(this.selectedMode == 'TRANSIT'){
        this.selectedMode = 'Fortbewegungsart: Transit';
      }

      console.log(this.selectedMode);

      //Titel der Location und Fortbewegungsart anzeigen
      window.location = "#detail2";

      var divloctitel2 = document.getElementById('loctitel2').innerHTML = "";

      divloctitel2 = document.getElementById('loctitel2');

      divloctitel2.innerText = this.titel;


      var select = document.getElementById('select').innerHTML = "";

      select = document.getElementById('select');

      select.innerText = this.selectedMode;


      //Funktion für map und Routenplanung
      routemap(this.titel);

    }

   //Funktion für die Datstellung aller Standorte auf der Karte
   function listMarkers(){

      //Array für Location namen und Geodaten
      var arrloc = [];
      var arrpos = [];

      //UserID in Variable speichern
      var userId = firebase.auth().currentUser.uid;

      //Pfad von Datenbank in Variable speichern
      var firebaseRef = firebase.database().ref('/users/' + userId);
      var firebaseloc = firebaseRef.child('location');

      //Location und Geodaten in den Arrays speichern
      firebaseloc.on('child_added', snap => {
        var key = snap.key;
        arrloc.push(key)
        var firebaselocd = firebaseRef.child('location/'+ key);
        var lat = firebaselocd.child('lat/');
        var lng = firebaselocd.child('lng/');
        lat.on('value', snap => {
        latdata = snap.val();
        });

      lng.on('value', snap => {
        lngdata = snap.val();
        });
        var pos = {
              lat: latdata,
              lng: lngdata
            };
        arrpos.push(pos);
      });

      //Funktion für Map mit allen Markers, Arrays mitgeben
      allMarkers(arrloc, arrpos);
    
    }








