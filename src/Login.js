import React, { useState } from 'react';
import "./style.css";

function App() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const mostrarContenido = (event) => {
    event.preventDefault();
    alert(`hello, ${inputValue}, this is a demonstration of my capabilities in css`);
  };

  return (
    <div className="my-component">
      <div className="center">
        <div className="Border">
          <h1 className="Login-text">User Login</h1>
          <form>
            <p>Username: </p>
            <input
              type="text"
              placeholder="Enter Your Username"
              className="username"
              value={inputValue}
              onChange={handleInputChange}
            />
            <p>Password: </p>
            <input
              type="password"
              placeholder="Enter Your Password"
              className="password"
            />
            <br></br>
            <button className="login" onClick={mostrarContenido}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
