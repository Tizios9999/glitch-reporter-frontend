import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function CheckTokenComponent() {
  const [state, dispatch, register, login, logout] = useContext(AuthContext);

  const currentTime = Date.now();

  const tokenExpiryDate = state.user
    ? new Date(state.user.expiration).getTime()
    : null;

  console.log(
    "valid login: ",
    tokenExpiryDate && tokenExpiryDate > currentTime
  );

  if (tokenExpiryDate && tokenExpiryDate < currentTime) {
    // Logout
    logout();
  }
  return <></>;
}

export default CheckTokenComponent;
