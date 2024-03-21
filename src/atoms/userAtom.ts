import { atom } from "jotai";

type UserAtomType = {
  email: string;
};
export const userAtom = atom<UserAtomType | null>(null);
