"use client";
/* IMPORTS */
// React
import { useEffect, useContext } from "react";
// Next.js
// External services
// Internal services
// Components
import Navbar from "./Navbar";
import Loading from "./Loading";
// Internal functions
// Contexts
import { AuthContext } from "../contexts/AuthContext";
import { AppContext } from "../contexts/AppContext";
// Material UI Components

/*
+-----------------------+
| COMPONENT DESCRIPTION |   
+-----------------------+

Wraps the entire application, serves as an inner layout.
Some general info like the user connected and ticket
metadata are loaded here as well.

*/

export const siteInfo = {
  title: "Glitch Reporter",
  description: "Application used for Bug Tracking",
};

export default function AppWrapper({ children }) {
  const [authState, authDispatch] = useContext(AuthContext);
  const [appState, appDispatch, loadMetadata] = useContext(AppContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    const savedInfo = user
      ? { isLoggedIn: true, user }
      : { isLoggedIn: false, user: null };

    authDispatch({
      type: "LOAD_LOCALSTORAGE",
      payload: savedInfo,
    });
  }, []);

  useEffect(() => {
    if (appState.metadata === null) {
      loadMetadata();
    }
  }, [appState.metadata]);

  return (
    <body style={{ marginTop: "80px " }}>
      {authState.loading || appState.loading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          {children}
          {console.log("auth", authState)}
          {console.log("appState", appState)}
        </>
      )}
    </body>
  );
}
