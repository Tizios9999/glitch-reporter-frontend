import React, { createContext, useReducer } from "react";
import getMetadata from "../services/metadata.service";
import { appReducer } from "../reducers/appReducer";

const AppContext = createContext();

const initialState = { metadata: null, loading: true };

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const loadMetadata = () => {
    return getMetadata().then((data) => {
      dispatch({
        type: "LOAD_METADATA",
        payload: { data },
      });

      return Promise.resolve();
    });
  };

  return (
    <AppContext.Provider value={[state, dispatch, loadMetadata]}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
