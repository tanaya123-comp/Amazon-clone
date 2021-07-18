import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCv8sLI4eoL3AgZIQD-4av14Uw7nBGflO8",
    authDomain: "challenge-8430f.firebaseapp.com",
    projectId: "challenge-8430f",
    storageBucket: "challenge-8430f.appspot.com",
    messagingSenderId: "326986901942",
    appId: "1:326986901942:web:9d96667426d50775157917",
    measurementId: "G-N8FFFNF3EX"
};

const firebaseApp=firebase.initializeApp(firebaseConfig);

const db=firebaseApp.firestore();

const auth=firebaseApp.auth();

export { db, auth } ;

