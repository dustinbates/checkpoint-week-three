import { generateId } from "../Utils/generateId.js"


export class Note{
    constructor(data){
        this.id = generateId()
        this.title = data.title
        this.color = data.color
        this.body = data.body || ''
        this.date = data.date || new Date().toLocaleTimeString('en-US')

    }

    get NoteTemplate(){
        return `
    <div class="col-10 card mt-5">
        <div class="p-0" id="activeNote"> 
            <div class="row justify-content-around">
                <div class="col-3 p-0 text-center">
                    <h1>${this.title}<i class="mdi mdi-music-note-whole" style="color: ${this.color}"></i></h1>
                    <p class="m-0">Created: ${this.date} </p>
                    <p class="m-0">Edited: ${this.date} </p>
                </div>
                <div class="col-7 p-0 mt-2 mb-2">
                    <textarea type="text" class="form-control" name="body" id="noteBody" placeholder="Start a new note...">${this.body}</textarea>
                </div>
                <div class="col-1 p-0 text-center">
                <button class="btn btn-danger mdi mdi-trash-can-outline fs-3 mt-2" onclick="app.notesController.deleteNote('${this.id}')"></button>
                </div>
            </div>
        </div>
    </div>
        `
    }

    get SmallTemplate(){
        return `
        <div class="col-12 selectable" onclick="app.notesController.setActiveNote('${this.id}')">
            <p>${this.title}<i class="mdi mdi-music-note-whole" style="color: ${this.color}"></i></p>
        </div>
        `
    }
}