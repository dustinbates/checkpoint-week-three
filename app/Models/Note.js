import { appState } from "../AppState.js"
import { generateId } from "../Utils/generateId.js"


export class Note{
    constructor(data){
        this.id = generateId()
        this.title = data.title
        this.color = data.color
        this.body = data.body || ''
        this.date = data.date || ''
        this.edited = data.edited || ''

    }

    get NoteTemplate(){
        return `
    <div class="col-10 card mt-5" style="border-color: ${this.color}">
        <div class="p-0" id="activeNote"> 
            <div class="row justify-content-between">
                <div class="col-4 p-0 text-center">
                    <h1>${this.title}<i class="mdi mdi-music-note-whole fs-1" style="color: ${this.color}"></i></h1>
                    <p class="m-0">Created: ${this.date} </p>
                    <p class="m-0">${this.edited} </p>
                </div>
                <div class="col-6 p-0 mt-2 mb-2">
                    <textarea type="text" class="form-control fs-3" name="body" id="noteBody" onblur="app.notesController.updateNote()" placeholder="Start a new note...">${this.body}</textarea>
                </div>
                <div class="col-1 p-0 d-flex justify-content-end">
                <button class="btn btn-danger mdi mdi-trash-can-outline fs-3 border-radius" onclick="app.notesController.deleteNote('${this.id}')"></button>
                </div>
            </div>
        </div>
    </div>
        `
    }

    get SmallTemplate(){
        return `
        <div class="col-12 selectable py-1" onclick="app.notesController.setActiveNote('${this.id}')">
            <h4>${this.title}<i class="mdi mdi-music-note-whole" style="color: ${this.color}"></i></h4>
        </div>
        `
    }

}

export const LandingPageTemplate = ` 
    <div class="col-10 card-landing mt-5 bg-light">
        <div class="p-0" id="landing-page">
            <div>
            <p class="landing-text"> Click the notebook <br> icon to get started</p>
            </div>
        </div>
    </div>`

