import firebase from "firebase";
import "firebase/firestore";

// var firebaseConfig = {
//     apiKey: "AIzaSyA1e5x1I_qbUjrXho_yCwvuO6F2AIKoYVo",
//     authDomain: "chat-428aa.firebaseapp.com",
//     databaseURL: "https://chat-428aa.firebaseio.com",
//     projectId: "chat-428aa",
//     storageBucket: "chat-428aa.appspot.com",
//     messagingSenderId: "905368348805",
//     appId: "1:905368348805:web:c56106678e7b95f3a7e1ec"
//   };
// const firebaseConfig = {
//   apiKey: "AIzaSyDxIeHT7sYi2QNiFZ204tnuvKg1HacveF4",
//   authDomain: "vuejs-1b92a.firebaseapp.com",
//   databaseURL: "https://vuejs-1b92a.firebaseio.com",
//   projectId: "vuejs-1b92a",
//   storageBucket: "vuejs-1b92a.appspot.com",
//   messagingSenderId: "1054109625441",
//   appId: "1:1054109625441:web:b9292375a32cc8cd1a0e20",
//   measurementId: "G-QN95QKFY9J",
// };
var firebaseConfig = {
  apiKey: "AIzaSyAaAjD2kPIrESVt47OnfoKgYcSjdjQ-AFE",
  authDomain: "pubg-42d97.firebaseapp.com",
  databaseURL: "https://pubg-42d97.firebaseio.com",
  projectId: "pubg-42d97",
  storageBucket: "pubg-42d97.appspot.com",
  messagingSenderId: "722398758234",
  appId: "1:722398758234:web:920fef4a8e18ea30e65f63",
  measurementId: "G-J96WJ42F26",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db;
