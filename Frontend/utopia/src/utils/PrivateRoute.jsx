import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  let { isAuthenticated } = useAuthContext();
  console.log({ children })
  return isAuthenticated.current ? { children } : (<Navigate to="/login" replace={true} />);
};

export default PrivateRoute;