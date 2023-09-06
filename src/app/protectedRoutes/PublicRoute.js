/* IMPORTS */
// React
import { useContext, useEffect } from "react";
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

The components / pages inside PublicRoute are accessible only
by NON-logged users. For example login or register pages.

*/

const PublicRoute = ({ children }) => {
  const router = useRouter();
  const [state] = useContext(AuthContext);

  useEffect(() => {
    if (state.isLoggedIn) {
      router.push("/");
    }
  }, [router, state.isLoggedIn]);

  if (state.isLoggedIn) {
    return null;
  }

  return children;
};

export default PublicRoute;
