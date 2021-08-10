import firebase from "firebase";

// setup firebase
const firebaseConfig = {
  apiKey: "AIzaSyAx1QkL3cnN6CvDI6pTXNPtF8y0giJ4wH0",
  authDomain: "discord-clone-72d57.firebaseapp.com",
  projectId: "discord-clone-72d57",
  storageBucket: "discord-clone-72d57.appspot.com",
  messagingSenderId: "370924056468",
  appId: "1:370924056468:web:81710f446cd5b4e91f2981",
};

// initializing firebase so we can use it
const firebaseApp = firebase.initializeApp(firebaseConfig);
// connect to the db aka firestore, which is real-time
const db = firebaseApp.firestore();
// authentication
const auth = firebase.auth();
// authentication through google accounts
const provider = new firebase.auth.GoogleAuthProvider();

// explicit imports
export { auth, provider };
// we use it as default b/c we use it a bunch
export default db;
