import {Navigate, Outlet} from "react-router";

const ProtectedRoute = () => {
  const accesToken = localStorage.getItem("accessToken");

  if (!accesToken) {
    return <Navigate to='/login' replace/>
  }

  return (
    <Outlet/>
  );
}

export default ProtectedRoute;