/* IMPORTS */
// React
import { useContext } from "react";
// Next.js
import { useRouter } from "next/navigation";
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

The components / pages inside Protected route can be accessed only
by the logged user. Some of them require a specific role to enter.

*/

const ProtectedRoute = ({ children, allowedRoles }) => {
  const router = useRouter();
  const [state] = useContext(AuthContext);

  if (!state.isLoggedIn) {
    router.push("/login");
    return null;
  }

  if (
    allowedRoles &&
    !allowedRoles.some((role) => state.user.roles.includes(role))
  ) {
    router.push("/");
    return null;
  }

  return children;
};

export default ProtectedRoute;
