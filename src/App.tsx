import { useState } from 'react'
import ComplimentList from './ComplimentList'
import AddNewCompliment from './AddNewCompliment';
import ComplimentCounter from './ComplimentCounter';
import { firestore } from './firebase';
import { collection, doc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import LogIn from './LogIn';
import './App.css'

function App() {
  const [user, setUser] = useState(null);

  const handleUserLogin = async (user) => {
    console.log('User logged in:', user);
    setUser(user);
    console.log('User logged in2:', user);  
  
    // Check if the user has a "userCompliments" collection
    const userRef = doc(firestore, "users", user.uid);
    const userSnap = await getDoc(userRef);
    console.log('User snapshot:', userSnap.exists());
  
    if (!userSnap.exists()) {
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

  return ( user ? ( 
  <>
    <ComplimentCounter />
    <ComplimentList />
    <AddNewCompliment />
    </>)
   : (
    <LogIn onUserLogin={handleUserLogin}/>
   )
  )
}

export default App
