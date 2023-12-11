import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../TokenReducer/tokenReducer";

function ProtectedRoute({ element, ...rest }) {
  const { idToken } = useAuth();

  if (!idToken){
    return <Navigate to="/login"/>
  }
  return <Outlet/>
}

export default ProtectedRoute;
