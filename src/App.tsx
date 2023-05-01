  //app.tsx

  import { SetStateAction, useState, useEffect, createContext } from 'react'
  import ComplimentList from './ComplimentList'
  import AddingCompliment from './AddingCompliment.js';
  import ComplimentCounter from './ComplimentCounter';
  import Header from './Header';
  import { ComplimentsContext } from './ComplimentsContext.js';
  import { UserContext } from './UserContext';
  import { firestore } from './firebase.ts';
  import { createUserInFirestore, getComplimentsByUser } from './firestoreService.js';
  import { collection, doc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, setDoc } from 'firebase/firestore';
  import LogIn from './LogIn';
  import './App.css'

  interface User {
    uid: string;
    email: string;
    name: string;
    photoURL: string;
    displayName: string;
  }

  interface Compliment {
    id?: string;
    content?: string;
    date?: Date;
    creatorId?: string;
  }

  function App() {
    const [user, setUser] = useState<User | null>(null);
    const [compliments, setCompliments] = useState<Compliment[]>([]);

    const handleUserLogin = async (user: User) => {
      console.log('User logged in:', user);
      setUser(user as User);
      console.log('User logged in2:', user);  
  
    };

    useEffect(() => {
      const fetchCompliments = async () => {
        if (user) {
          const compliments = await getComplimentsByUser(user.uid);
          setCompliments(compliments);
          console.log('User compliments', compliments);
        }
      };
    
      if (user) {
        fetchCompliments();
      }
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
      <ComplimentCounter/>
      <ComplimentList />
      <AddingCompliment userId={user.uid}/>
      </div>
      </div>
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

