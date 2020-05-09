import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDGNPU3jE2opK0hr8HdTiZcV1SRbTYqYAs",
    authDomain: "armacom-35db6.firebaseapp.com",
    databaseURL: "https://armacom-35db6.firebaseio.com",
    projectId: "armacom-35db6",
    storageBucket: "armacom-35db6.appspot.com",
    messagingSenderId: "941592972243",
    appId: "1:941592972243:web:96015e26323935452cbd26"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const database = firebase.database();

export default firebase;