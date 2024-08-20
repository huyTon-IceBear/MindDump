"use client";

import { ContextProviderProps, NoteContextType } from "@/types/context";
import { Note, NoteAction } from "@/types/note";
import { createContext, useContext, useReducer } from "react";

export const NotesContext = createContext<NoteContextType | null>(null);
export const NotesDispatchContext =
  createContext<React.Dispatch<NoteAction> | null>(null);

export function NotesProvider({ children }: ContextProviderProps) {
  const [notes, dispatch] = useReducer(notesReducer, []);
  return (
    <NotesContext.Provider value={{ notes }}>
      <NotesDispatchContext.Provider value={dispatch}>
        {children}
      </NotesDispatchContext.Provider>
    </NotesContext.Provider>
  );
}

export function useTasks() {
  return useContext(NotesContext);
}

export function useTasksDispatch() {
  return useContext(NotesDispatchContext);
}

function notesReducer(notes: Note[], action: NoteAction): Note[] {
  switch (action.type) {
    case "added": {
      return [
        ...notes,
        {
          id: action.id,
          text: action.text,
        },
      ];
    }
    case "changed": {
      return notes.map((n) => {
        if (n.id === action.note.id) {
          return action.note;
        } else {
          return n;
        }
      });
    }
    case "deleted": {
      return notes.filter((n) => n.id !== action.id);
    }
    default: {
      throw Error("Unknown action type!");
    }
  }
}
