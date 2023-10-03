import React, { useState } from 'react';
import appFireBase from '../credenciales';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import "./style.css"

const auth = getAuth(appFireBase);

const Login = () => {
  const [register, setRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (register) {
        await createUserWithEmailAndPassword(auth, username, password);
      } else {
        await signInWithEmailAndPassword(auth, username, password);
      }
    } catch (error) {
      // Captura el error y muestra un mensaje personalizado
      switch (error.code) {
        case 'auth/invalid-email':
          setErrorMessage('Invalid Email');
          break;
        case 'auth/user-not-found':
          setErrorMessage('User Not Found');
          break;
        case 'auth/wrong-password':
          setErrorMessage('Invalid Password');
          break;
        // Agrega otros casos de error según tus necesidades
        default:
          setErrorMessage('Login Error');
      }
    }
  };

  return (
    <div id="my-component">
      <div id="center">
        <div id="Border">
          <h1 id="Login-text">{register ? "User Sign Up" : "User Login"}</h1>
          <form onSubmit={handleSubmit}>
            <p className='InputText'>Email:</p>
            <input
              type="text"
              className="input"
              placeholder="Enter Your Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <p className='InputText'>Password:</p>
            <input
              type="password"
              className="input"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br></br>
            <button id="login" type="submit">
              {register ? "Sign up" : "Login"}
            </button>
            <p>{errorMessage}</p>
            <p id='ifnot'>
              {register ? "already user?" : "not registered?"}
              <button id='ButtonChange' onClick={() => setRegister(!register)}>
                {register ? "Login" : "Sign Up"}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
