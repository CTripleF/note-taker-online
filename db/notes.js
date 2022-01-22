const util = require('util');
const fs = require('fs');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class Note {
  read(){
    return readFile('db/db.json')
  }

  write(){
    return writeFile('db,db.json', JSON.stringify(noteContent))
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
  
  getNotes() {
    return this.read()
    .then(notes => {
      return JSON.parse(notes) || [];
    })
  }
}

module.exports = new Note();