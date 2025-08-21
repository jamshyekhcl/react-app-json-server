import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () =>
  // { allowedRoles }: { allowedRoles: string[] }
  {
    const token = localStorage.getItem("token") || "null";
    if (!token) {
      return <Navigate to="/login" replace />;
    }

    // if (!allowedRoles.includes(user.role)) {
    //   return <Navigate to="/login" replace />;
    // }

    return <Outlet />;
  };

export default ProtectedRoute;
