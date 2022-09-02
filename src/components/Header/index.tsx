import { signInAnonymously, signInWithPopup, signOut, User } from 'firebase/auth';
import { auth, provider } from '../../api/firebase';

import { GoogleLogo } from 'phosphor-react';
import { useEffect, useState } from 'react';

import { logOut } from '../../hooks/useApi';

export function Header() {
  const [username, setUsername] = useState<string>('');

  //Sets up displayname showing in case of user already logged ing (persistent log in)
  useEffect(()=>{
    auth.onAuthStateChanged(()=>{
      if(auth.currentUser){
        setUsername(auth.currentUser.displayName ? auth.currentUser.displayName : "Anônimo")
      }
      })  
  }, [])

  //Handles sign in option with popup, using google authentication
  async function handleGoogleSignIn() {
    //Checks if the user is already logged in before attempting to perform action
    if (!auth.currentUser) {
      await signInWithPopup(auth, provider)
        .then((result) => {
          if (result.user.displayName) {
            setUsername(result.user.displayName);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      //If user already logged in, performs log out
      await logOut()
        .then((result) => {
          setUsername('');
        })
        .catch((err) => console.log(err));
    }
  }
  async function handleAnonymousSignIn() {
    //Checks if the user is already logged in before attempting to perform action
    if (!auth.currentUser) {
      await signInAnonymously(auth)
        .then((result) => {
          console.log(result)
            setUsername('Anônimo');
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      //If user already logged in, performs log out
      await logOut()
        .then((result) => {
          setUsername('');
        })
        .catch((err) => console.log(err));
    }
  }
  return (
    <header className="relative flex w-full items-center justify-center bg-primary">
      <img className="my-2 w-[6rem]" src="\assets\house.png" alt="House Icon" />
      <h1 className="mx-2 text-2xl font-bold">HouseHold</h1>
      <button
        onClick={handleAnonymousSignIn}
        className="btn-primary md:absolute md:right-64 h-12 group"
      >
        {!auth.currentUser && <span>Sign in Anônimo</span>}
        {auth.currentUser && <span className='group-hover:invisible group-focus:invisible'>{username ? username : 'Sign in Anônimo'}</span>}
        {auth.currentUser && <span className='absolute group-hover:visible group-focus:visible invisible'>Log Out</span>}
      </button>
      <button
        onClick={handleGoogleSignIn}
        className="btn-primary md:absolute md:right-32 group"
      >
        <GoogleLogo size={32} />
        {!auth.currentUser && <span>Sign in</span>}
        {auth.currentUser && <span className='group-hover:invisible group-focus:invisible'>{username ? username : 'Sign in'}</span>}
        {auth.currentUser && <span className='absolute left-12 group-hover:visible group-focus:visible invisible'>Log Out</span>}
      </button>
    </header>
  );
}
