// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const { REACT_APP_FIREBASE_API_KEY } = process.env;

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: "ucare-e7783.firebaseapp.com",
  projectId: "ucare-e7783",
  storageBucket: "ucare-e7783.appspot.com",
  messagingSenderId: "116550458500",
  appId: "1:116550458500:web:7a19a6d2ecb1598e0ab6d1",
  measurementId: "G-WFL84B5GCW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();

const auth = getAuth();

export const signInGoogleWithPopup = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    console.log(token, user);
  } catch (error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
  }
};

export const getUserProfile = async (user, name) => {
  try {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data());
  } catch (error) {
    console.log(user.uid, error);
    return false;
  }
};

export const setUpNewProfile = async (user, name, photoURL) => {
  try {
    console.log(user, name);
    const document = await setDoc(doc(db, "users", user.uid), {
      photoURL: photoURL ? photoURL : "",
      healthInsuarance: "",
      timestamp: new Date(),
      displayName: name,
      email: user.email,
    });
    return document;
  } catch (error) {
    return false;
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return false;
  }
};

export const fetchUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user;
};

export const saveUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};
