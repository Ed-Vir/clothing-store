import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBlCf43uUMcBAt-KB78awI-bFExL1SFwxo",
  authDomain: "clothing-store-db-7f0dd.firebaseapp.com",
  databaseURL: "https://clothing-store-db-7f0dd.firebaseio.com",
  projectId: "clothing-store-db-7f0dd",
  storageBucket: "clothing-store-db-7f0dd.appspot.com",
  messagingSenderId: "381804014836",
  appId: "1:381804014836:web:b58b9d26e02cfd1fcd82a1",
  measurementId: "G-3E5TGFX4GQ"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get()

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  } 
  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;