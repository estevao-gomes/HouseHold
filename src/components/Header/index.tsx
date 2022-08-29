import { signInWithPopup, signOut, User } from "firebase/auth";
import { auth, provider } from "../../api/firebase";

import { GoogleLogo } from "phosphor-react";
import { useState } from "react";

import { logOut } from "../../hooks/useApi";

export function Header() {
  const [username, setUsername] = useState<string>(auth.currentUser?.displayName ? auth.currentUser.displayName : "");

  async function handleSignIn() {
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
      await logOut()
        .then((result) => {
          setUsername("");
          console.log("Log Out successful");
        })
        .catch((err) => console.log(err));
    }
  }
  return (
    <header className="relative flex w-full items-center justify-center bg-primary">
      <img className="my-2 w-[6rem]" src="\assets\house.png" alt="House Icon" />
      <h1 className="mx-2 text-2xl font-bold">HouseHold</h1>
      <button
        onClick={handleSignIn}
        className="btn-primary md:absolute md:right-32"
      >
        <GoogleLogo size={32} />
        {username ? username : "Sign in"}
      </button>
    </header>
  );
}
