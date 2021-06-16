import React, { useState, useEffect } from 'react';

import jwt from 'jsonwebtoken';
import cookie from 'react-cookies';
import superagent from 'superagent';

export const LoginContext = React.createContext();

function LoginProvider(props) {

  const [loggedIn, setLoggedIn] = useState(false);

  const [user, setUser] = useState({});

  const validateToken = (token) => {
    try {
      const tokenUser = jwt.verify(  token, process.env.REACT_APP_SECRET)
      setLoggedIn(true);
      setUser(tokenUser);
      cookie.save('auth', token);
    } catch(e) {
      setUser({});
      setLoggedIn(false);
      console.warn('Bad Token', e)
    }
  }

  const logout = () => {
   setUser({});
   setLoggedIn(false);
   cookie.remove('auth');
  }

  const can = (userRole) => {
    return user.capabilities && user.capabilities.includes(userRole);
  }

  const login = async (input) => {
    const API = `${process.env.REACT_APP_API}/signin`;
    try {
      const response = await superagent.post(API)
        .auth( input.username, input.password );

        const {token} = response.body;

        validateToken(token);

    } catch(e) {
      console.warn('Login Attempt Failed')
    }
  }

  useEffect( () => {
    const token = cookie.load('auth') || null;
    validateToken(token);
  }, [])

  const sharedVals = {
    login,
    logout,
    can,
    user,
    loggedIn
  };

  return (
    <LoginContext.Provider value={sharedVals}>
      {props.children}
    </LoginContext.Provider>
  )

}

export default LoginProvider;
