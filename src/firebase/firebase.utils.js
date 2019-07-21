import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyBMIuFJAVDGJ-q6WAt6I0EH3kAo8qyv0MI",
    authDomain: "e-commerce-site-32092.firebaseapp.com",
    databaseURL: "https://e-commerce-site-32092.firebaseio.com",
    projectId: "e-commerce-site-32092",
    storageBucket: "",
    messagingSenderId: "619624622021",
    appId: "1:619624622021:web:93c2e245aa25239a"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithgoogle = () => auth.signInWithPopup(provider);

  export default firebase;