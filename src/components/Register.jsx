
import React, { useEffect, useState } from 'react'
import { auth, provider } from '../firebase'
import { signInWithPopup, signOut } from 'firebase/auth'
// import { useDispatch, useSelector } from 'react-redux'
// import { addUser } from '../toolkit/LoginSlice'

 export default function Register() {

  


// const userDetails= useSelector(state=>state.login.isLoggedIn)
// console.log(userDetails);

   const [signedUpUser, setsignedUpUser]= useState( JSON.parse(localStorage.getItem("user")) || null)

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setsignedUpUser(storedUser);
  }, []);

   
 async function handleSignUp(){
let res= await signInWithPopup(auth, provider)
const user= res.user;
console.log(user);

setsignedUpUser(user)
localStorage.setItem("user", JSON.stringify(user))

}
 async function handleSignOut(){
// 3 
 await signOut(auth)
localStorage.removeItem("user")
setsignedUpUser(null)

 }
   return (
     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        {
            signedUpUser !== null ?
            <>
            <h1 className="text-3xl font-bold text-green-800 mb-6">welcome , {signedUpUser.displayName}</h1>
            <button onClick={()=>handleSignOut()} className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors font-semibold">signOut</button>
            </>

            :
            <button onClick={()=>handleSignUp()} className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"> sign up with google </button>
        }
        
     </div>
   )
 }

