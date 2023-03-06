import {Navigate}  from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({children}) => {
//   const navigate = useNavigate()
   let {user}  = useContext(AuthContext) ?? {};
  return user ? {children} : (<Navigate to="/login" replace ={true}/>);

};

export default PrivateRoute;