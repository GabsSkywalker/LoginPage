import React from 'react'
import { useState } from 'react';
import Login from './components/login';
import Home from './components/home';
//import firebase modules
import appFireBase from './credenciales';
import {getAuth , onAuthStateChanged} from "firebase/auth"
const auth = getAuth(appFireBase);




export const App = () => {
    const [user,setUser] = useState(null)
    onAuthStateChanged(auth,(fireBaseUser)=>{
        if (fireBaseUser){
            setUser(fireBaseUser)
        }
        else{
            setUser(null)
        }
    })
  return (
    <div>
        {user ? <Home UserEmail = {user.email} ></Home> : <Login></Login> }
    </div>
  )
}

export default App
