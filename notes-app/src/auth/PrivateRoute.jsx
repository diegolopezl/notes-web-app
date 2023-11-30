import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute({ auth }) {
  console.log(auth + " xdxdxdxd");
  return auth ? <Outlet /> : <Navigate to="/signin" />;
}
