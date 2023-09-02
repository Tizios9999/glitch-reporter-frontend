import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";

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
