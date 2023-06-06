import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = UserAuth();

  return user ? <>{children}</> : <Navigate to={"/login"} replace />;
};

export default ProtectedRoute;
