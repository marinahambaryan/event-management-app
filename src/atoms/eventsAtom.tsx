import { atom } from "jotai";
import { Event } from "../API";

type EventsAtomType = Event[];
export const eventsAtom = atom<EventsAtomType>([]);
