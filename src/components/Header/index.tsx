import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult } from 'firebase/auth'
import { auth, provider } from '../../api/firebase';

import { GoogleLogo } from 'phosphor-react'

export function Header(){

    async function handleSignIn(){

        await signInWithPopup(auth, provider)
            .then((result)=>{
                    console.log(result.user)
                })
            .catch((error)=>{
                console.log(error)
                console.log(error.message)
            })


    }
    return(
        <header className="flex relative justify-center items-center w-full bg-primary">
            <img className="w-[6rem] my-2" src="src\assets\house.png"  alt="House Icon"/>
            <h1 className="mx-2 font-bold text-2xl">HouseHold</h1>
            <button onClick={handleSignIn} className='flex absolute w-fit bg-primary-dark p-2 rounded-xl items-center right-32 hover:bg-opacity-80 hover:ring-primary-light hover:ring-2'><GoogleLogo size={32}/>Sign in</button>
        </header>
    )
}