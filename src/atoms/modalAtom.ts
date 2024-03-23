import { atom } from "jotai";

export const modalInitialState = { isOpen: false, mode: null };

type ModalAtomType = {
  isOpen: boolean;
  mode: "create" | "edit" | null;
};
export const modalAtom = atom<ModalAtomType>(modalInitialState);
