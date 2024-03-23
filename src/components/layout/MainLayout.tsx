import { useAtomValue } from "jotai";
import { Outlet } from "react-router-dom";

import NavBar from "./NavBar";
import PageLoader from "./PageLoader";
import AlertNotification from "./AlertNotification";
import { loaderAtom } from "../../atoms/loaderAtom";
import { notificationAtom } from "../../atoms/notificationAtom";

const MainLayout = () => {
  const notification = useAtomValue(notificationAtom);
  const loading = useAtomValue(loaderAtom);

  return (
    <div>
      <NavBar />
      <Outlet />
      {loading && <PageLoader />}
      {notification.isOpen && <AlertNotification />}
    </div>
  );
};
export default MainLayout;
