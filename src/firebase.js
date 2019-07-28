import firebase from 'firebase'; 

var firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };
  // Initialize Firebase
  export const fb = firebase.initializeApp(firebaseConfig);
  export const au = fb.auth();
