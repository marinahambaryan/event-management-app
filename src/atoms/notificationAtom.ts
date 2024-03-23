import { atom } from "jotai";

type NotificationAtomType = {
  message: string;
  isOpen: boolean;
  status: "error" | "success" | "info" | null;
};
export const notificationAtom = atom<NotificationAtomType>({
  message: "",
  status: null,
  isOpen: false,
});
