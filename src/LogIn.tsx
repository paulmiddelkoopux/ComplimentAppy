import { auth, googleProvider } from './firebase';
import { signInWithPopup } from 'firebase/auth';

function LogIn () {

    const signInWithGoogle = async () => {
        try {
          googleProvider.setCustomParameters({ prompt: 'select_account' });
          const result = await signInWithPopup(auth, googleProvider);
          if (result.additionalUserInfo.isNewUser) {
            setSignUp(true);
          }
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
        <div className="login-signup">
          <button onClick={signInWithGoogle} className="button">Log in with Google</button>
          <small className="disclaimer">This app uses the Spotify API but does not store Spotify user data.</small>
        </div>
        </>
    );
}

export default LogIn