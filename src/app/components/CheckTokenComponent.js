/* IMPORTS */
// React
import { useContext } from "react";
// Next.js
// External services
// Internal services
// Components
// Internal functions
// Contexts
import { AuthContext } from "../contexts/AuthContext";
// Material UI Components

/*
+-----------------------+
| COMPONENT DESCRIPTION |   
+-----------------------+

This component is used to check the expiration of the JWT token.
If the token is expired, the user is logged out automatically.

*/

function CheckTokenComponent() {
  const [state, dispatch, register, login, logout] = useContext(AuthContext);

  const currentTime = Date.now();

  const tokenExpiryDate = state.user
    ? new Date(state.user.expiration).getTime()
    : null;

  if (tokenExpiryDate && tokenExpiryDate < currentTime) {
    // Logout
    logout();
  }
  return <></>;
}

export default CheckTokenComponent;
