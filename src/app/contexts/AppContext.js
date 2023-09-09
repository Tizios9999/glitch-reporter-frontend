/* IMPORTS */
// React
import React, { createContext, useReducer } from "react";
// Next.js
// External services
// Internal services
import getMetadata from "../services/metadata.service";
// Components
// Internal functions

// Contexts and reducers
import { appReducer } from "../reducers/appReducer";
// Material UI Components

/*
+-----------------------+
| CONTEXT DESCRIPTION |   
+-----------------------+

The Application Context is a shared state about all the application
elements such as the metadata, if the app is loading, active filters
and so on.

*/

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const initialState = {
    metadata: null,
    loading: true,
    ticketsPerPage: 15,
    activeFilters: {
      priority: [],
      status: [],
    },
  };

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
