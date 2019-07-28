import firebase from 'firebase'; 

var firebaseConfig = {
    apiKey: "AIzaSyCjHNAcbmKoByfz_b7k9__o9uS-06ixn0A",
    authDomain: "vue-firebase-ecommerce.firebaseapp.com",
    databaseURL: "https://vue-firebase-ecommerce.firebaseio.com",
    projectId: "vue-firebase-ecommerce",
    storageBucket: "",
    messagingSenderId: "1019118550352",
    appId: "1:1019118550352:web:e0531361f723354f"
  };
  // Initialize Firebase
  export const fb = firebase.initializeApp(firebaseConfig);
  export const au = fb.auth();