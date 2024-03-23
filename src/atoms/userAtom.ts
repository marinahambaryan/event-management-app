import { atom } from "jotai";

type UserAtomType = {
  id: string;
  email: string;
};
export const userAtom = atom<UserAtomType | null>(null);
