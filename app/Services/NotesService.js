import { appState } from "../AppState.js";
import { Note } from "../Models/Note.js";
import { saveState } from "../Utils/Store.js";
import { setHTML } from "../Utils/Writer.js";


class NotesService {
    updateNote(updatedBody) {
        let activeNote = appState.activeNote
        activeNote.body = updatedBody
        saveState('activeNote', appState.activeNote)
        saveState('notes', appState.notes)
        appState.emit('activeNote')
        appState.emit('notes')
    }

    deleteNote(noteId) {
        let foundNote = appState.notes.findIndex(n => n.id == noteId)
        console.log(foundNote);
        appState.notes.splice(foundNote, 1)
        // appState.emit('notes')
        setHTML('activeNote', appState.activeNote?.LandingPageTemplate)
        saveState('activeNote', appState.activeNote)
        appState.emit('activeNote')
    }

    setActiveNote(noteId) {
        let foundNote = appState.notes.find(n => n.id == noteId)
        // console.log(noteId);
        // @ts-ignore
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