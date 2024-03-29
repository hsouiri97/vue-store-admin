import firebase from "firebase";
require("firebase/firestore");

var firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_KEY,
  authDomain: "vue-firebase-ecommerce.firebaseapp.com",
  databaseURL: "https://vue-firebase-ecommerce.firebaseio.com",
  projectId: "vue-firebase-ecommerce",
  storageBucket: "vue-firebase-ecommerce.appspot.com",
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGE_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID
};
// Initialize Firebase
export const fb = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
//export const storageRef = firebase.storage().ref();
