const router = require('express').Router();
const notesdb = require('../lib/notes');

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

router.post('/notes', (req, res) => {
  console.log(req.body)
    notesdb
      .addNote(req.body)
      .then(note => {
        res.json(note)
      })
      .catch(err => {
        res.status(500).json(err)
      })
});

router.delete('/notes/:id', (req, res) => {
  notesdb
      .removeNote(req.params.id)
      .then(() => res.json({ ok: true }))
      .catch(err => res.status(500).json(err))
})

module.exports = router;