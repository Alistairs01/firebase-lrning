import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";
export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    console.log(auth?.currentUser?.email)
    const signIn = async () => {
        try {
        await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.log(error);
        }
        };

    const signInWithGoogle = async () => {
        try {  
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.log(error);
        }
    };
    const logOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <input type="email" placeholder="email" onChange={(event) => setEmail(event.target.value)}   />
            <input type="password" placeholder="password" onChange={(event) => setPassword(event.target.value)}     />
            <button onClick={signIn}>Sign In</button>
            <button onClick={signInWithGoogle}>Sign In With Google</button>
            <button onClick={logOut}>Log Out</button>
        </div>
    )
}