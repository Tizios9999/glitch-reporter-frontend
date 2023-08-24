import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function CheckTokenComponent() {
  const [state, dispatch, register, login, logout] = useContext(AuthContext);

  const currentTime = Date.now();

  const tokenExpiryDate = new Date(state.user.expiration).getTime();

  console.log(
    "valid login: ",
    state.isLoggedIn && tokenExpiryDate > currentTime
  );

  if (state.isLoggedIn && tokenExpiryDate < currentTime) {
    // Logout
    logout();
  }
  return <></>;
}

export default CheckTokenComponent;
