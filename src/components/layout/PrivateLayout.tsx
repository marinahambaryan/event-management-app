import { useAtomValue } from "jotai";
import { Outlet, Navigate } from "react-router-dom";

import { userAtom } from "../../atoms/userAtom";

const PrivateLayout = () => {
  const user = useAtomValue(userAtom);

  if (!user) {
    return <Navigate to="/signIn" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default PrivateLayout;
