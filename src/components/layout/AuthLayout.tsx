import { useAtomValue } from "jotai";
import { Navigate, Outlet } from "react-router-dom";
import { userAtom } from "../../atoms/userAtom";

const AuthLayout = () => {
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

export default AuthLayout;
