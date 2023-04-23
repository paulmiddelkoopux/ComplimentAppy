import { SetStateAction, useState } from 'react'
import ComplimentList from './ComplimentList'
import AddingCompliment from './AddingCompliment.js';
import ComplimentCounter from './ComplimentCounter';
import Header from './Header';
import { UserContext } from './UserContext';
import { firestore } from './firebase.js';
import { createUserInFirestore } from './firestoreService.js';
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

  const handleUserLogin = async (user: SetStateAction<user | null>) => {
    console.log('User logged in:', user);
    setUser(user);
    console.log('User logged in2:', user);  
  
    // Check if the user has a "userCompliments" collection
    const userRef = doc(firestore, "users", user.uid);
    const userSnap = await getDoc(userRef);
    console.log('User snapshot:', userSnap.exists());
  
    if (!userSnap.exists()) {
      // If the user does not exist in Firestore, create the user document
    await createUserInFirestore(user, (data: any) => {});

      // If the user does not have a "userCompliments" collection, create it and add a first compliment
      const complimentsRef = collection(firestore, "userCompliments");
      console.log('Creating "userCompliments" collection...');

      const newCompliment = {
        text: "By trying out this app, I show self-love",
        date: new Date()
      };
  
      // Add the first compliment to the "userCompliments" collection
      await addDoc(complimentsRef, newCompliment);
  
      // Create a reference to the new "userCompliments" collection and add it to the "users" collection
      const userComplimentsRef = doc(firestore, "users", user.uid);
      await setDoc(userComplimentsRef, { userCompliments: complimentsRef });
      console.log('"userCompliments" collection created!');
    }
  };

  return ( 
    <UserContext.Provider value={user?.uid ?? null}>
    {user ? ( 
    <div className="app">
    <div className="headerBar">
      <Header user={user} />
    </div>
  <div className="content">
    <ComplimentCounter />
    <ComplimentList />
    <AddingCompliment userId={user.uid} user={user} />
    </div>
    </div>)
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
