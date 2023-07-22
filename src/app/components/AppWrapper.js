"use client";
import { useEffect, useContext } from "react";
import Navbar from "./Navbar";
import Loading from "./Loading";
import { AuthContext } from "../contexts/AuthContext";
import { AppContext } from "../contexts/AppContext";

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
  }, []);

  return (
    <body>
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
