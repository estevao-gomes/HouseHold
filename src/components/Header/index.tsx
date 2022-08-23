import { signInWithPopup, signOut, User } from "firebase/auth";
import { auth, provider } from "../../api/firebase";

import { GoogleLogo } from "phosphor-react";
import { useState } from "react";

import { useUser } from "../../contexts/UserContext";

export function Header() {
  const [username, setUsername] = useState<string>("");

  const { setUid } = useUser();

  async function handleSignIn() {
    if (!username) {
      await signInWithPopup(auth, provider)
        .then((result) => {
          console.log(result.user);
          setUid(result.user.uid);
          if (result.user.displayName) {
            setUsername(result.user.displayName);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      await signOut(auth)
        .then((result) => {
          setUsername("");
          setUid("");
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
