import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyB8-Bm2EHSaCfUXVR-bjx-n5AdGnwcVD-k',
  authDomain: 'keke-cook-ecommerce.firebaseapp.com',
  projectId: 'keke-cook-ecommerce',
  storageBucket: 'keke-cook-ecommerce.appspot.com',
  messagingSenderId: '331538616794',
  appId: '1:331538616794:web:c74dca93a7b2970865b0e3',
  measurementId: 'G-MBT0XVXC58',
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export default firebase;
