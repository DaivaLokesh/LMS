import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isLoggedIn = !!localStorage.getItem("studentId");
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
