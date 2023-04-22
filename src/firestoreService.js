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
} from 'firebase/firestore';

export const addCompliment = async (userId, compliment) => {
    try {
      const docRef = await addDoc(collection(firestore, `userCompliments/${userId}/compliments`), compliment);
      return docRef.id;
    } catch (error) {
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
  