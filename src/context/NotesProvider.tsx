"use client";

import { ContextProviderProps, NoteContextType } from "@/types/context";
import { ActionTypes, Note, NoteAction } from "@/types/note";
import { nanoid } from "nanoid";
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

export function useNotes() {
  const context = useContext(NotesContext);

  if (!context) {
    throw new Error("The Context must be used within an ContextProvider");
  }

  return context;
}

export function useNotesDispatch() {
  const dispatch = useContext(NotesDispatchContext);

  if (dispatch === null) {
    throw new Error(
      "useNotesDispatch must be used within a NotesDispatchContextProvider"
    );
  }

  return dispatch;
}

function notesReducer(notes: Note[], action: NoteAction): Note[] {
  switch (action.type) {
    case ActionTypes.ADD_NOTE: {
      return [
        ...notes,
        {
          id: nanoid(),
          text: action.text,
        },
      ];
    }
    case ActionTypes.CHANGE_NOTE: {
      return notes.map((n) => {
        if (n.id === action.note.id) {
          return action.note;
        } else {
          return n;
        }
      });
    }
    case ActionTypes.DELETE_NOTE: {
      return notes.filter((n) => n.id !== action.id);
    }
    default: {
      throw Error("Unknown action type!");
    }
  }
}
