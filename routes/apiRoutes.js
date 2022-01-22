const router = require('express').Router();
const notesdb = require('../db/notes');

router.get('/notes', (req, res) =>{
  notesdb
    .getNotes()
    .then(notes => {
      res.json(notes)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

// router.post('/notes', (req, res) => {
  
// });

// router.delete('/notes/:id', (req, res) => {

// });

module.exports = router;