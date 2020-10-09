
const router = require('express').Router();
const notes  = require('../Develop/db/db.json');
const uuid = require('uuid');
const fs = require('fs');
const path = require('path');

//get function
router.get('/notes', (req,res) => {
    res.json(notes); 
  
});

//post a new note
router.post('/notes', (req,res) => {
    if(!req.body.title || !req.body.text){
        return res.status(400).json({msg: 'Please include a title and text'});
    }
    const newNotes = {
          id: uuid.v4(),
          title: req.body.title,
          text: req.body.text
    };

    //console.log(notes['note']);
    notes.push(newNotes);
    res.json(newNotes);
    
    //write to json file
    fs.writeFileSync(
        path.join(__dirname, '../Develop/db/db.json'),
        JSON.stringify(notes)
    );
})

// //delete a note
// router.delete('/notes/:id', (req,res) => {
//     const found = notes.some(note => note.id === req.params.id);
//     if(found){
//         res.json({msg: `Note deleted`, 
//         notes: notes.filter(note=> note.id != req.params.id)});
//     }
//     else{
//         res.status(400).json({msg: `No note with that id`});
//     }
//     //remove the note from the array
//     notes.splice(notes.indexOf(notes.filter(note=> note.id === req.params.id)[0]),1);

//     //write to json file
//     fs.writeFileSync(
//         path.join(__dirname, './db/db.json'),
//         JSON.stringify(notes)
//     );
// })

module.exports = router;