import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDyrff9_s1wLUg7OOnH1zSiDhc9ewGXbIw",
    authDomain: "chofer-fe8fe.firebaseapp.com",
    databaseURL: "https://chofer-fe8fe.firebaseio.com",
    projectId: "chofer-fe8fe",
    storageBucket: "chofer-fe8fe.appspot.com",
    messagingSenderId: "667363357557",
    appId: "1:667363357557:web:0c97e0e517515f860f993c",
    measurementId: "G-VMFNGTPJJ7"
};

const fb = firebase.initializeApp(firebaseConfig);
export const db = fb.firestore();
