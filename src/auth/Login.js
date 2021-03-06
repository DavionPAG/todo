import React, {useState, useContext} from "react";

import {If, Then, Else} from 'react-if';

import {LoginContext} from './context.js';

//bug fixes

function Login(props) {

  const [user, setUser] = useState({});
  const userContext = useContext(LoginContext);

  const handleChange = (e) => {
    setUser( {...user, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    userContext.login(user);
  }


  return (
    <If condition={userContext.loggedIn}>
      <Then>
        <button onClick={userContext.logout}>Log Out</button>
        {props.children}
      </Then>
      <Else>
        <form onSubmit={handleSubmit}>
          <input placeholder="Username" name="username" onChange={handleChange} />
          <input name="password" type="password" onChange={handleChange} />
          <button>Login</button>
        </form>
      </Else>
    </If>
  )

}

export default Login;
