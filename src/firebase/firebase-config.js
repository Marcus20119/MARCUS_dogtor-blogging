import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBgwPuAJcREHTt0KAinF0ToX0mOu4EQ-1M',
  authDomain: 'monkey-blogging-4878f.firebaseapp.com',
  projectId: 'monkey-blogging-4878f',
  storageBucket: 'monkey-blogging-4878f.appspot.com',
  messagingSenderId: '303804306602',
  appId: '1:303804306602:web:24ee8eee9530cd3273acd3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Init service
export const db = getFirestore(app);
export const auth = getAuth(app);
