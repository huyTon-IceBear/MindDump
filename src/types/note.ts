export interface Note {
    id: string;
    text: string;
};

// Define action types as an enum to ensure consistency and prevent typos
export enum ActionTypes {
    ADD_NOTE = "ADD_NOTE",
    CHANGE_NOTE = "CHANGE_NOTE",
    DELETE_NOTE = "DELETE_NOTE",
}

// Define type for each action type to enforce type safety
export type AddNoteAction = {
    type: ActionTypes.ADD_NOTE;
    text: string;
  };
  
  export type ChangeNoteAction = {
    type: ActionTypes.CHANGE_NOTE;
    note: Note;
  };
  
  export type DeleteNoteAction = {
    type: ActionTypes.DELETE_NOTE;
    id: string;
  };

export type NoteAction = 
| AddNoteAction
| ChangeNoteAction
| DeleteNoteAction
