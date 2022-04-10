import React, { useState } from "react";
import { UserCircleIcon } from "@heroicons/react/solid";
import fbLogo from '../../icons/fb.png'
import GitHubLogo from '../../icons/GitHub.png'
import googleLogo from '../../icons/google.png'
import { createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import app from "../../firebase.init";


const Form = () => {
// data storage
// const [displayName , setdisplayName] = useState('');
// const [number , setNumber] = useState('');
const [email , setEmail] = useState('');
const [password , setPassword] = useState('');
const [check , setCheck] = useState(false);
const [messages , setMessages]=useState('')

const auth = getAuth(app);

// for submitForm 
const submitForm =(e)=>{
   if(check){
      signInWithEmailAndPassword(auth,email,password)
      .then(result =>{
         console.log('login')
      }).catch(error =>{
         setMessages('try agin now');
      })
   }else{
      createUserWithEmailAndPassword(auth,email,password)
      .then(result =>{
         console.log(result.user);
         sendEmail();
         setCheck(true)
      }).catch(error =>{
         console.error(error);
      })
   }
   e.preventDefault();
}
// for user name 
const userName = (e) =>{
   // displayName(e.target.value)
   
}
// user number
const userNumber = (e) => {
   // setNumber(e.target.value)
} 
// for email 
const userEmail = (e) =>{
   setEmail(e.target.value)
}
// for user Password 
const userPassword = (e) =>{
   setPassword(e.target.value)
}
// for  checked box
const checked = (e) =>{
   if(e.target.checked){
      setCheck(true);
   }else{
      setCheck(false)
   }
}
// send email 
const sendEmail= () =>{
   sendEmailVerification(auth.currentUser)
   .then(() =>{
      setMessages('email send ')
   }).catch(error =>{
      setMessages('E-mail send un successfully')
   })
}
// forget password 
const forgetPassword = () =>{
   sendPasswordResetEmail(auth,email)
   .then(()=>{
      setMessages('email send check your email')
   }).catch(error =>{
      setMessages('try agin now');
   })
}
// sign in  google

const loginWithGoogle = () =>{
   const provider =new GoogleAuthProvider();
   signInWithPopup(auth,provider)
   .then(result =>{
      console.log(result.user)
   }).catch(error =>{
      setMessages('Login Agin Now');
   })
} 
// sing with github
const loginWithGithub = () =>{
   const provider = new GithubAuthProvider();
   signInWithPopup(auth , provider)
   .then(result => {
      console.log(result.user)
   }).catch(error =>{
      setMessages('Login Agin Now');
   })
}

// log in facebook 
const logWithFacebook = () =>{
   const provider = new FacebookAuthProvider();
   signInWithPopup(auth,provider)
   .then(result =>{
      console.log(result.user)
   }).catch(error =>{
      setMessages('Login Agin Now');
   })
}
return (
   <div>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 border-4 rounded-md p-4 bg-slate-200">
         <div>
            <p className="w-24 h-auto mx-auto">
            {" "}
            <UserCircleIcon></UserCircleIcon>{" "}
            </p>
            <h2 className="mt-1 text-center text-3xl font-extrabold text-gray-800 font-serif">
            {
               check ? "Sign in " : " sign up"
            }
            </h2>
         </div>
         <form className="mt-8 space-y-6" onSubmit={submitForm} >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
            {
               check ? '' : 
               <div>
                  <div className="">
               {/* sr-only */}
                  <label htmlFor="userName" className="">
                     User Name
                  </label>
                  <input
                     id="userName"
                     name="userName"
                     type="text"
                     autoComplete="current-User-Name"
                     required
                     onBlur={userName}
                     className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                     placeholder="User Name"
                  />
               </div>
                  <div className="py-3">
                     {/* sr-only */}
                     <label htmlFor="userNumber" className="">
                        Mobile Number
                     </label>
                     <input
                        id="userNumber"
                        name="userNumber"
                        type="number"
                        autoComplete="current-number"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Mobile Number"
                        onBlur={userNumber}
                     />
                  </div>
               </div>
            }
            <div>
               <label htmlFor="email-address" className="">
                  Email address
               </label>
               <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  onBlur={userEmail}
               />
            </div>
            <div className="py-3">
               {/* sr-only */}
               <label htmlFor="password" className="">
                  Password
               </label>
               <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  onBlur={userPassword}
               />
            </div>
            </div>

            <div className="flex items-center justify-between">
            <div className="flex items-center">
               <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  onChange={checked}
               />
               <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900 font-serif"
               >
                  {
                     check ? "Create New Account" : "I Have Account"
                  }
               </label>
            </div>

            <div className="text-sm">
               <button
                  className="font-medium text-indigo-600 hover:text-indigo-400"
                  onClick={forgetPassword}
               >
                  {
                     check ? "Forgot your password ?" : ""
                  }
               </button>
            </div>
            </div>

            <div>
               <p className="py-2">{messages}</p>
            <button
               type="submit"
               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
               
            >
               <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  {/* <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" /> */}
               </span>
               {
                  check ? "sign in" : "sign up"
               }
            </button>
            </div>
         </form>
         <div id="accessOtherAccount">
            <div className="flex justify-center">
               <button onClick={loginWithGoogle} className="googleIcon ml-6 w-10 cursor-pointer">
                  <img src={googleLogo} alt="fb logo" />
               </button>
               <button  onClick={logWithFacebook} className="fbLogo ml-6 w-10 cursor-pointer">
                  <img src={fbLogo} alt="fb logo" />
               </button>
               <button onClick={loginWithGithub} className="GitHubLogo ml-6 w-10 cursor-pointer">
                  <img src={GitHubLogo} alt="fb logo" />
               </button>
            </div>
         </div>
      </div>
      </div>
   </div>
);
};

export default Form;
