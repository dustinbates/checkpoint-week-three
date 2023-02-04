import { appState } from "../AppState.js";
import { notesService } from "../Services/NotesService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML } from "../Utils/Writer.js";


function _drawActiveNote(){
    console.log('draw notes function firing');
    let note = appState.activeNote
    setHTML('activeNote', note.NoteTemplate)
}

function _drawNotesList(){
    console.log('draw notes list firing')
    let notes = appState.notes
    let template = ''
    notes.forEach(note => template += note.SmallTemplate)
    setHTML('notesList', template)
}

export class NotesController{
    constructor(){
        console.log('Hello from the NotesController');
        appState.on('activeNote', _drawActiveNote)
        appState.on('notes', _drawNotesList)
    }

    createNote(){
    try{
        window.event.preventDefault()
        const form = window.event.target
        const formData = getFormData(form)
        console.log(formData)
        form.reset()
        notesService.createNote(formData)
        
    } catch (error){
        Pop.error(error)
        console.error(error)
    }

    }

    setActiveNote(noteId){
        try{
            notesService.setActiveNote(noteId)
        } catch (error) {
            Pop.error(error)
        }
    }

    async deleteNote(noteId){
        try{
            const yes = await Pop.confirm('Are you sure you want to delete this note?')
            if (!yes) { return }
            notesService.deleteNote(noteId)
        } catch (error){
            Pop.error(error)
        }

    }

}