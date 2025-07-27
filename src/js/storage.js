import { displayNote } from "./notes";

export function saveNoteToLocal(note){
    const key=note.isPinne? 'pinnedNotes' : 'regularNotes';
    const existing=JSON.parse(localStorage.getItem(key)) || [];
    existing.push(note);
    localStorage.setItem(key,JSON.stringify(existing));
}

export function loadNotesFromLocal(){
    const regularNotes=JSON.parse(localStorage.getItem('regularNotes'));
    const pinnedNotes=JSON.parse(localStorage.getItem('pinnedNotes'));

    (regularNotes || []).forEach(note => displayNote(note));
    (pinnedNotes || []).forEach(note => displayNote(note));
}