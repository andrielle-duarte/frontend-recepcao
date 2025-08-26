import { Navigate } from "react-router-dom";

export default function PrivateRoute({ token, children }) {
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
}