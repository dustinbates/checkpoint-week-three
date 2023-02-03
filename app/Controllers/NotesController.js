import { appState } from "../AppState.js";
import { notesService } from "../Services/NotesService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML } from "../Utils/Writer.js";


function _drawNotes(){
    console.log('draw notes function firing');
    let notes = appState.notes
    let template = ''
    notes.forEach(note => template += note.NoteTemplate)
    setHTML('notes', template)
}

export class NotesController{
    constructor(){
        console.log('Hello from the NotesController');
        appState.on('notes', _drawNotes)
        _drawNotes()
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


}