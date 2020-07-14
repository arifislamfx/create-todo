import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB0bBQ3Gi1qGuOZCHg45K0MPlO2S8EOR4Y",
  authDomain: "create-todo.firebaseapp.com",
  databaseURL: "https://create-todo.firebaseio.com",
  projectId: "create-todo",
  storageBucket: "create-todo.appspot.com",
  messagingSenderId: "814000378857",
  appId: "1:814000378857:web:1167c1fcd4c27225da7178",
  measurementId: "G-LLXCQB8M0H",
});

const db = firebaseApp.firestore();
export default db;
