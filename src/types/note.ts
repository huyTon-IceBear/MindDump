export interface Note {
    id: string;
    text: string;
    mediaFiles: FileWithUrl[];
};

// Define action types as an enum to ensure consistency and prevent typos
export enum ActionTypes {
    ADD_NOTE = "ADD_NOTE",
    CHANGE_NOTE = "CHANGE_NOTE",
    DELETE_NOTE = "DELETE_NOTE",
    REMOVE_NOTES = "REMOVE_NOTES",
}

// Define type for each action type to enforce type safety
export type AddNoteAction = {
    type: ActionTypes.ADD_NOTE;
    text: string;
    mediaFiles: FileWithUrl[];
};
  
export type ChangeNoteAction = {
    type: ActionTypes.CHANGE_NOTE;
    note: Note;
};
  
export type DeleteNoteAction = {
    type: ActionTypes.DELETE_NOTE;
    id: string;
};

export type RemoveNotesAction = {
    type: ActionTypes.REMOVE_NOTES;
};

export type NoteAction = 
| AddNoteAction
| ChangeNoteAction
| DeleteNoteAction
| RemoveNotesAction

export enum ActionOptions {
    Edit = "Edit",
    Remove = "Remove",
    View = "View",
    Copy = "Copy"
}

export const NoteActionOptions: string[] =  Object.values(ActionOptions);

export interface FileWithUrl extends File {
    url: string;
    id: string;
  }
  