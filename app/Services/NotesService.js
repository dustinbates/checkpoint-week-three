import { appState } from "../AppState.js";
import { Note } from "../Models/Note.js";
import { saveState } from "../Utils/Store.js";


class NotesService {
    deleteNote(noteId) {
        let foundNote = appState.notes.find(n => n.id == noteId)
        appState.notes.splice(foundNote, 1)
        appState.emit('notes')
    }

    setActiveNote(noteId) {
        let foundNote = appState.notes.find(n => n.id == noteId)
        console.log(noteId);
        appState.activeNote = foundNote
        appState.emit('activeNote')
    }

    createNote(formData){
        let newNote = new Note(formData)
        console.log(newNote);
        appState.notes.push(newNote)
        appState.emit('notes')
    }
}

export const notesService = new NotesService()