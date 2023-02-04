import { appState } from "../AppState.js";
import { Note } from "../Models/Note.js";
import { saveState } from "../Utils/Store.js";


class NotesService {
    deleteNote(noteId) {
        let foundNote = appState.notes.findIndex(n => n.id == noteId)
        console.log(foundNote);
        appState.notes.splice(foundNote, 1)
        appState.emit('notes')
    }

    setActiveNote(noteId) {
        let foundNote = appState.notes.find(n => n.id == noteId)
        // console.log(noteId);
        appState.activeNote = foundNote
        saveState('activeNote', appState.activeNote)
        appState.emit('activeNote')
    }

    createNote(formData){
        let newNote = new Note(formData)
        // console.log(newNote);
        appState.notes.push(newNote)
        saveState('notes', appState.notes)
        appState.emit('notes')
        appState.activeNote = newNote
        saveState('activeNote', appState.activeNote)
        appState.emit('activeNote')
    }
}

export const notesService = new NotesService()