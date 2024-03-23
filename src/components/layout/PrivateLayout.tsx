import { Outlet } from "react-router-dom";
import type { WithAuthenticatorProps } from "@aws-amplify/ui-react";

const PrivateLayout = ({
  signOut = () => {},
  user,
}: WithAuthenticatorProps) => {
  if (!user) {
    signOut();
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default PrivateLayout;
