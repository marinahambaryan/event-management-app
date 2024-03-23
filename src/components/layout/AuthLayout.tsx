import { useAuthenticator } from "@aws-amplify/ui-react";
import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const { user } = useAuthenticator((context) => [context.user]);

  if (user) {
    return <Navigate to="/events" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
