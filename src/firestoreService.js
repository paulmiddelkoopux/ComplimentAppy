//firestoreService.js

import { firestore } from './firebase';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';

export const createUserInFirestore = async (user, setData) => {
  const userRef = doc(firestore, `users/${user.uid}`);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    const newUser = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      // Add any other initial data you want to store for new users
    };
    console.log('New user has:', user.uid, user.displayName, user.email, user.photoURL);

    try {
      await setDoc(userRef, newUser);
      setData({ userId: user.uid });
    } catch (error) {
      console.error('Error creating user in Firestore:', error);
      setData({ userId: null });
    }
  } else {
    setData({ userId: user.uid });
  }
};


export const addCompliment = async (userId, compliment) => {
  try {
    const complimentsRef = collection(firestore, `users/${userId}/compliments`);
    const newComplimentRef = doc(complimentsRef);
    const newComplimentData = {
      content: compliment,
      date: serverTimestamp(),
      creatorId: userId,
    };
    await setDoc(newComplimentRef, newComplimentData);
    console.log('Added compliment with doc ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.log('user =', userId)
    console.error('Error adding compliment to Firestore:', error);
    return null;
  }
};


  export const deleteCompliment = async (userId, complimentId) => {
    try {
      await deleteDoc(doc(firestore, `userCompliments/${userId}/compliments/${complimentId}`));
    } catch (error) {
      console.error('Error deleting compliment from Firestore:', error);
    }
  };

  export const getComplimentsByUser = async (userId) => {
    try {
      const querySnapshot = await getDocs(collection(firestore, `userCompliments/${userId}/compliments`));
      const compliments = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return compliments;
    } catch (error) {
      console.error('Error getting compliments from Firestore:', error);
      return null;
    }
  };
  