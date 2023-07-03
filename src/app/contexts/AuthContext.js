import React, { createContext, useReducer } from 'react';
import { authReducer } from '../reducers/authReducer';
import { useRouter } from 'next/navigation';


import AuthService from "../services/auth.service";


// Context creation
const AuthContext = createContext();


  
const initialState = { loading: true, isLoggedIn: false, user: null, message:"" };

// Provider for the global state
const AuthContextProvider = ({ children }) => {

  const { push } = useRouter();

  const [state, dispatch] = useReducer(authReducer, initialState);

  const register = (username, email, password) => {
    return AuthService.register(username, email, password).then(
      (response) => {
        dispatch({
          type: "REGISTER_SUCCESS",
        });
  
        dispatch({
          type: "SET_MESSAGE",
          payload: response.data.message,
        });

        push("/");
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: "REGISTER_FAIL",
        });
  
        dispatch({
          type: "SET_MESSAGE",
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };

  const login = (username, password) => {
    return AuthService.login(username, password).then(
      (data) => {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { user: data },
        });
  
        push("/dashboard");

        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: "LOGIN_FAIL",
        });
  
        dispatch({
          type: "SET_MESSAGE",
          payload: message,
        });

        return Promise.reject();
      }
    );
  };

  const logout = () => {
    AuthService.logout();
  
    console.log("logging out")

    dispatch({
      type: "LOGOUT",
    });

    push("/");
  };

  return (
    <AuthContext.Provider value={[state, dispatch, register, login, logout]}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };