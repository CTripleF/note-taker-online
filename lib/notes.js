const util = require('util');
const fs = require('fs');
const uuid = require ('uuid').v1;

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);


class Note {
  read(){
    return readFile('db/db.json', 'utf-8')
  }

  write(noteContent){
    return writeFile('db/db.json', JSON.stringify(noteContent))
  }

  getNotes() {
    return this.read()
    .then(notes => {
      return JSON.parse(notes) || [];
    })
  }

  addNote (newNoteContent){
    const {title, text} = newNoteContent;

    if(!title || !text){
      throw new Error ('please fill out all fields')
    }
    const newNote = {title, text, id:uuid};

    return this.getNotes()
    .then(notes => [...notes, newNote])
    .then(updatedNotes => this.write(updatedNotes))
    .then(() => this.newNote)
  }

  deleteNote(id) {
    return this.getNotes()
    .then(notes => notes.filter(note => note.id !== id))
    .then(filteredNotes => this.write(filteredNotes));
  }
  
}

module.exports = new Note();