import { generateId } from "../Utils/generateId.js"


export class Note{
    constructor(data){
        this.id = generateId()
        this.title = data.title
        this.color = data.color
        this.body = data.body || ''
        this.date = data.date

    }



    get NoteTemplate(){
        return `
        <div class="col-10 m-auto">
          <div class="card mt-5 p-0" id="activeNote"> 
            <div class="row">
              <div class="col-3 text-center">
                <h1>${this.title}</h1>
                <p class="m-0">Created:${this.date} </p>
                <p class="m-0">Edited: </p>
              </div>
              <div class="col-8 mt-2 mb-2">
                <textarea type="text" class="form-control" name="body" id="noteBody" placeholder="...">${this.body}</textarea>
              </div>
            </div>
          </div>
        </div>
        `
    }
}