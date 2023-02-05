import { appState } from "../AppState.js";
import { LandingPageTemplate } from "../Models/Note.js";
import { notesService } from "../Services/NotesService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { Pop } from "../Utils/Pop.js";
import { saveState } from "../Utils/Store.js";
import { setHTML, setText } from "../Utils/Writer.js";


function _drawActiveNote(){
    console.log('draw notes function firing', appState.activeNote);
    let note = appState.activeNote
    if (note?.title ){
        console.log('There is a note');
        setHTML('activeNote', note.NoteTemplate)
    } else{
        console.log('There is NO note');
        setHTML('activeNote', LandingPageTemplate)
    }
}

function _drawNotesList(){
    console.log('draw notes list firing')
    let notes = appState.notes
    let template = ''
    notes.forEach(note => template += note.SmallTemplate)
    setHTML('notesList', template)
}

function _totalNotes(){
    let total = 0
    for(let i = 0; i <= appState.notes.length; i++){
        total += 1
    }
    setText('totalNotes', total-1)
}

export class NotesController{
    constructor(){
        console.log('Hello from the NotesController');
        _drawActiveNote()
        _drawNotesList()
        _totalNotes()
        appState.on('activeNote', _drawActiveNote)
        appState.on('notes', _drawNotesList)
    }

    createNote(){
    try{
        window.event?.preventDefault()
        const form = window.event?.target
        const formData = getFormData(form)
        // console.log(formData)
        // @ts-ignore
        form.reset()
        notesService.createNote(formData)
        _totalNotes()
        
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
        _totalNotes()
    } catch (error){
        Pop.error(error)
    }
    }

    updateNote(){
    try{
        let textarea = document.getElementById('noteBody')
        let updatedBody = textarea.value
        console.log('updated', updatedBody)
        notesService.updateNote(updatedBody)
        }
    catch (error){
        console.error(error)
        Pop.error(error)
    }
    }
}