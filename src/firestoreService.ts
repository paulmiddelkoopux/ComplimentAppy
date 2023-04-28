//firestoreService.js

import { firestore } from './firebase.ts';
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

export async function createUserInFirestore({ user, setData }: { user: any; setData: { (data: any): void; (arg0: { userId: any; }): void; }; }): Promise<void> {
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
}

export const getComplimentsByUser = async (userId: string) => {
  try {
    const querySnapshot = await getDocs(collection(firestore, `users/${userId}/compliments`));
    const compliments = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return compliments;
  } catch (error) {
    console.error('Error getting compliments from Firestore:', error);
    return null;
  }
};


export const addCompliment = async (userId: string, compliment: any) => {
  try {
    const complimentsRef = collection(firestore, `users/${userId}/compliments`);
    console.log('complimentsRef', complimentsRef)
    const newComplimentRef = doc(complimentsRef);
    console.log('newComplimentRef', newComplimentRef)
    const newComplimentData = {
      content: compliment,
      date: serverTimestamp(),
      creatorId: userId,
    };
    console.log('newComplimentData', newComplimentData)
    await addDoc(complimentsRef, newComplimentData);
    console.log('Added compliment with doc ID:', complimentsRef);
    return complimentsRef;
  } catch (error) {
    console.log('user =', userId)
    console.error('Error adding compliment to Firestore:', error);
    return null;
  }
};


export const deleteCompliment = async (userId: any, complimentId: any) => {
  try {
    await deleteDoc(doc(firestore, `users/${userId}/compliments/${complimentId}`));
  } catch (error) {
    console.error('Error deleting compliment from Firestore:', error);
  }
};


