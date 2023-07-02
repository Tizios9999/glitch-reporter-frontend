import React, { createContext, useReducer } from 'react';
import { authReducer } from '../reducers/authReducer';


// Context creation
const AuthContext = createContext();

// const user = JSON.parse(localStorage.getItem("user"));
  
const initialState = { loading: true, isLoggedIn: false, user: null };

// Provider for the global state
const AuthContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };