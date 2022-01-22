const util = require('util');
const fs = require('fs');
const path = require('path');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class Note {
  read(){
    return readFile('db/db.json', 'utf-8')
  }

  write(){
    return writeFile('db,db.json', JSON.stringify(noteContent))
  }

  getNotes() {
    return this.read()
    .then(notes => {
      return JSON.parse(notes) || [];
    })
  }

  addNote (noteContent){
    const {title, text} = noteContent;

    if(!title || !text){
      throw new Error ('please fill out all fields')
    }
    const newNote = {title, text}

    return this.getNote()
    .then(notes => [...notes, newNote])
    .then(updatedNotes => this.write(updatedNotes))
    .then(() => this.newNote)
  }

  deleteNote(id) {
    return this.retrieveNotes()
    .then(notes => notes.filter(note => note.id !== id))
    .then(filteredNotes => this.write(filteredNotes));
  }
  
}

module.exports = new Note();