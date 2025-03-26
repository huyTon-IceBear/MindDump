import { Note } from "./note";

export interface NoteContextType {
  notes: Note[];
}

export interface ContextProviderProps {
  children: React.ReactNode;
}
