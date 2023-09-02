import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const router = useRouter();
  const [state] = useContext(AuthContext);

  useEffect(() => {
    if (!state.isLoggedIn) {
      router.push("/login");
    }
  }, [router, state.isLoggedIn]);

  if (!state.isLoggedIn) {
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
