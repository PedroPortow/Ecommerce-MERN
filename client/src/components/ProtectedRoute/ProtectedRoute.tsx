import { Outlet, useNavigate } from "react-router-dom";

export const ProtectedRoute = () => {
  const navigate = useNavigate();
  // const { isAuthenticated } = useAuth();
  // if (!isAuthenticated) {
    // navigate("/auth");
  // }

  return (
    <Outlet />
  );
};