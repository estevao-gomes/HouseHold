import { signInWithPopup, signOut, User } from 'firebase/auth';
import { auth, provider } from '../../api/firebase';

import { GoogleLogo } from 'phosphor-react';
import { useState } from 'react';

import { useUser } from '../../contexts/UserContext';

export function Header() {
  const [username, setUsername] = useState<string>('');

  const { setUid } = useUser();

  async function handleSignIn() {
    if (!username) {
      await signInWithPopup(auth, provider)
        .then((result) => {
          console.log(result.user);
          setUid(result.user.uid);
          setUsername(result.user.displayName);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      await signOut(auth)
        .then((result) => {
          setUsername('');
          setUid('');
          console.log('Log Out successful');
        })
        .catch((err) => console.log(err));
    }
  }
  return (
    <header className="flex relative justify-center items-center w-full bg-primary">
      <img
        className="w-[6rem] my-2"
        src="src\assets\house.png"
        alt="House Icon"
      />
      <h1 className="mx-2 font-bold text-2xl">HouseHold</h1>
      <button
        onClick={handleSignIn}
        type="button"
        className="flex absolute w-fit bg-primary-dark p-2 rounded-xl items-center right-32 hover:bg-opacity-80 hover:ring-primary-light hover:ring-2"
      >
        <GoogleLogo size={32} />
        {username ? username : 'Sign in'}
      </button>
    </header>
  );
}
