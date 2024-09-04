"use client";

import { ContextProviderProps, NoteContextType } from "@/types/context";
import { ActionTypes, Note, NoteAction } from "@/types/note";
import { nanoid } from "nanoid";
import { createContext, useContext, useReducer } from "react";

/**
 * Context for storing the notes state.
 */
export const NotesContext = createContext<NoteContextType | null>(null);

/**
 * Context for storing the dispatch function to update notes.
 */
export const NotesDispatchContext =
  createContext<React.Dispatch<NoteAction> | null>(null);

/**
 * Provider component for the Notes context.
 *
 * @param {ContextProviderProps} props - The props for the provider.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the provider.
 * @returns {JSX.Element} The provider component.
 */
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

/**
 * Custom hook to access the notes state from the NotesContext.
 *
 * @returns {NoteContextType} The notes context value.
 * @throws {Error} If used outside of a NotesProvider.
 */
export function useNotes() {
  const context = useContext(NotesContext);

  if (!context) {
    throw new Error("The Context must be used within an ContextProvider");
  }

  return context;
}

/**
 * Custom hook to access the dispatch function from the NotesDispatchContext.
 *
 * @returns {React.Dispatch<NoteAction>} The dispatch function for updating notes.
 * @throws {Error} If used outside of a NotesDispatchContextProvider.
 */
export function useNotesDispatch() {
  const dispatch = useContext(NotesDispatchContext);

  if (dispatch === null) {
    throw new Error(
      "useNotesDispatch must be used within a NotesDispatchContextProvider"
    );
  }

  return dispatch;
}

/**
 * Reducer function for managing the notes state.
 *
 * @param {Note[]} notes - The current state of notes.
 * @param {NoteAction} action - The action to be performed on the notes.
 * @returns {Note[]} The new state of notes after applying the action.
 * @throws {Error} If an unknown action type is provided.
 */
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
    case ActionTypes.REMOVE_NOTES: {
      return [];
    }
    default: {
      throw Error("Unknown action type!");
    }
  }
}
