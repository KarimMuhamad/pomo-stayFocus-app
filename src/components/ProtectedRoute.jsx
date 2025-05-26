import {Navigate, Outlet} from "react-router";
import Layout from "./Layout.jsx";
import {useAuth} from "../contexts/AuthContext.jsx";

const ProtectedRoute = () => {
  const {user} = useAuth();

  if (!user) {
    return <Navigate to='/login' replace/>
  }

  return (
    <Outlet/>
  );
}

export default ProtectedRoute;