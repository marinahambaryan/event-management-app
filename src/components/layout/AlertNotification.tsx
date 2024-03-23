import { useMemo } from "react";
import { useAtom } from "jotai";

import { notificationAtom } from "../../atoms/notificationAtom";

const AlertNotification = () => {
  const [notification, setNotification] = useAtom(notificationAtom);
  const closeAlert = () => {
    setNotification({ message: "", status: null, isOpen: false });
  };

  const { bgColor, textColor, iconColor } = useMemo(() => {
    switch (notification.status) {
      case "error":
        return {
          bgColor: "bg-red-100",
          textColor: "text-red-700",
          iconColor: "text-red-500",
        };

      case "success":
        return {
          bgColor: "bg-green-100",
          textColor: "text-green-700",
          iconColor: "text-green-500",
        };
      case "info":
        return {
          bgColor: "bg-blue-100",
          textColor: "text-blue-700",
          iconColor: "text-blue-500",
        };
      default:
        return {
          bgColor: "bg-gray-100",
          textColor: "text-gray-700",
          iconColor: "text-gray-500",
        };
    }
  }, [notification]);

  if (!notification.isOpen) return <></>;

  return (
    <div
      className={`border ${bgColor} border-t-4 border-solid rounded px-4 py-3 shadow-md`}
      role="alert"
    >
      <div className="flex items-center">
        <div className="py-1">
          <svg
            className={`fill-current h-6 w-6 ${iconColor}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M14.348 5.652a.5.5 0 00-.707 0L10 9.293 6.358 5.65a.5.5 0 00-.708.708L9.293 10l-3.64 3.642a.5.5 0 00.707.708L10 10.707l3.642 3.64a.5.5 0 00.708-.707L10.707 10l3.64-3.642a.5.5 0 000-.707z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-2">
          <p className={`font-bold ${textColor}`}>{notification.message}</p>
        </div>
      </div>
      <span
        className="absolute top-0 bottom-0 right-0 px-4 py-3"
        onClick={closeAlert}
      >
        <svg
          className={`fill-current h-6 w-6 ${iconColor}`}
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <title>Close</title>
          <path
            fillRule="evenodd"
            d="M14.348 5.652a.5.5 0 00-.707 0L10 9.293 6.358 5.65a.5.5 0 00-.708.708L9.293 10l-3.64 3.642a.5.5 0 00.707.708L10 10.707l3.642 3.64a.5.5 0 00.708-.707L10.707 10l3.64-3.642a.5.5 0 000-.707z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </div>
  );
};

export default AlertNotification;
