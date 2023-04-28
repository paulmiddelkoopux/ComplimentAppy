// Header.jsx
import React from 'react';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';
import './Header.css';
import * as Popover from '@radix-ui/react-popover';
import { CaretDownIcon } from '@radix-ui/react-icons';

interface Props {
  user: {
    uid: string;
    photoURL: string;
    displayName: string;
  }
  }

const Header = ({ user }: Props) => {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  return (
    <div className="header">
      Brillar
        <Popover.Root>
    <Popover.Trigger className="PopoverTrigger">
      <div className="userProfileInfo"> 
        <img src={user.photoURL} alt={user.displayName} className="userProfileInfoPic" /> </div>
      <button className="IconButton" aria-label="Update dimensions">
        <CaretDownIcon />
      </button>
      </Popover.Trigger>
    <Popover.Portal>
      <Popover.Content className="PopoverContent" sideOffset={5}>
              <button onClick={handleLogout} className="logout-button">Logout</button>
        <Popover.Arrow className="PopoverArrow" />
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
    </div>
  );
};

export default Header;
