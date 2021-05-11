import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLHSlYwdJzwjZi2z82bZQXPnPN_w_KXZw",
  authDomain: "whatsapp-clone-f72ec.firebaseapp.com",
  projectId: "whatsapp-clone-f72ec",
  storageBucket: "whatsapp-clone-f72ec.appspot.com",
  messagingSenderId: "159360925143",
  appId: "1:159360925143:web:a80795d22ebc1550d49f92",
  measurementId: "G-Y2DWFJP45N"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;