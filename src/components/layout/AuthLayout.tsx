import { useAtomValue } from "jotai";
import { Outlet, Navigate } from "react-router-dom";

import { userAtom } from "../../atoms/userAtom";

const AuthLayout = () => {
  const user = useAtomValue(userAtom);

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
