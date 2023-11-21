import {initializeApp} from 'firebase/app';
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBNtxSv5osVW12POUzCXxNIJUIP1av5amc",
  authDomain: "kajri-appliction.firebaseapp.com",
  projectId: "kajri-appliction",
  storageBucket: "kajri-appliction.appspot.com",
  messagingSenderId: "839198250926",
  appId: "1:839198250926:web:cea10826232615c7af5a3f",
  measurementId: "G-NNCQCRGXHW"
};
const app = initializeApp(firebaseConfig);

initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});  

const auth = getAuth(app);
const storage = getStorage(app);
const firestore = getFirestore(app);

export {auth,storage,firestore};
