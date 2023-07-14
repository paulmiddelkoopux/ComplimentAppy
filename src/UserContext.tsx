import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';  // ensure to import your auth object from firebase.ts

const UserContext = React.createContext<string | null>(null);

const UserProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is signed in:', user);
        setCurrentUser(user.uid);  // or any other user data you're interested in
      } else {
        console.log('User is signed out');
        setCurrentUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={currentUser}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
