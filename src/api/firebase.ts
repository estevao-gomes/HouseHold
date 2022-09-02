// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// web app's Firebase configuration

const firebaseConfig = {
  apiKey: 'AIzaSyCpKO5j-xf53c7-oU7V_5_gjIqjvLwO98M',
  authDomain: 'household-test-a1082.firebaseapp.com',
  databaseURL: 'https://household-test-a1082-default-rtdb.firebaseio.com',
  projectId: 'household-test-a1082',
  storageBucket: 'household-test-a1082.appspot.com',
  messagingSenderId: '284901011167',
  appId: '1:284901011167:web:795ad6a94a32c8d38a836a',
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const db = getFirestore(app);

// Initialize provider and auth object for google authentication
export const provider = new GoogleAuthProvider();

export const auth = getAuth(app);
