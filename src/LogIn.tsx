//LogIn.tsx

import { auth, googleProvider } from './firebase';
import { signInWithPopup } from 'firebase/auth';
import firebase from 'firebase/app';
import './LogIn.css'

type LogInProps = {
  onUserLogin: (user: firebase.User) => void;
};

function LogIn(props: LogInProps) {

  const signInWithGoogle = async () => {
    try {
      googleProvider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log('Logged in user:', user);
      props.onUserLogin(user);
    } catch (error) {
      console.error('Error during Google sign-in:', error);
    }
  };

  return (
    <>
      <div className="header-and-tagline">
        <h1>Brillar</h1>
        <p>Keep yourself glowing</p>
      </div>
      <div className="login">
        <button onClick={signInWithGoogle} className="button">Continue with Google</button>
        <small className="disclaimer">This app does not share your data</small>
      </div>
    </>
  );
}

export default LogIn;
