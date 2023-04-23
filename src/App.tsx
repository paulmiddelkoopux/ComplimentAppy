//app.tsx

import { SetStateAction, useState, useEffect, createContext } from 'react'
import ComplimentList from './ComplimentList'
import AddingCompliment from './AddingCompliment.js';
import ComplimentCounter from './ComplimentCounter';
import Header from './Header';
import { ComplimentsContext } from './ComplimentsContext.js';
import { UserContext } from './UserContext';
import { firestore } from './firebase.js';
import { createUserInFirestore, getComplimentsByUser } from './firestoreService.js';
import { collection, doc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import LogIn from './LogIn';
import './App.css'

interface user {
  uid: string;
  email: string;
  name: string;
  photoURL: string;
  displayName: string;
}

function App() {
  const [user, setUser] = useState<user | null>(null);
  const [compliments, setCompliments] = useState<Compliment[]>([]);


  const handleUserLogin = async (user: SetStateAction<user | null>) => {
    console.log('User logged in:', user);
    setUser(user);
    console.log('User logged in2:', user);  
  
    // Check if the user has a "compliments" collection
    const userRef = doc(firestore, "users", user.uid);
    const userSnap = await getDoc(userRef);
    console.log('User snapshot:', userSnap.exists());
  
    if (!userSnap.exists()) {
      // If the user does not exist in Firestore, create the user document
    await createUserInFirestore(user, (data: any) => {});

      // If the user does not have a "compliments" collection, create it and add a first compliment
      const complimentsRef = collection(firestore, "compliments");
      console.log('Creating "compliments" collection...');

      const newCompliment = {
        text: "By trying out this app, I show self-love",
        date: new Date()
      };
  
      // Add the first compliment to the "compliments" collection
      await addDoc(complimentsRef, newCompliment);
  
    }
  };

  useEffect(() => {
    const fetchCompliments = async () => {
      if (user) {
        const compliments = await getComplimentsByUser(user.uid);
        setCompliments(compliments);
        console.log('User compliments', compliments);
      }
    };
  
    fetchCompliments();
  }, [user]);

  return ( 
    <UserContext.Provider value={user?.uid ?? null}>
    {user ? ( 
      <ComplimentsContext.Provider value={compliments}>
    <div className="app">
    <div className="headerBar">
      <Header user={user} />
    </div>
  <div className="content">
    <ComplimentCounter />
    <ComplimentList userId={user.uid} user={user} />
    <AddingCompliment userId={user.uid} user={user} />
    </div>
    </div>
    {console.log("ComplimentsContext state:", compliments)}
    </ComplimentsContext.Provider>)
   : (
    <div className="login">
    <LogIn onUserLogin={handleUserLogin}/>
    </div>
   )
}
   </UserContext.Provider>
  )
}

export default App

