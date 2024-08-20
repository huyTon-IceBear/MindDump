export interface Note {
    id: string;
    text: string;
};

export type NoteAction = 
| {type: "added"; id: string; text: string}
| {type: "changed"; note: Note}
| {type: "deleted"; id: string}
