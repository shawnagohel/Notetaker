// // Connect routes to journal data.
// var journalData = require("../data/journalData");

// // Routing
// module.exports = function (app) {

//   // GET request
//   app.get("/api/journals", function (req, res) {
//     res.json(journalData);
//   });

//   // POST request
//   app.post("/api/journals", function (req, res) {
//     journalData.push(req.body);
//     res.json("saved");
//   });

// //   // // DELETE request
// //   // app.delete("/api/journals/:index", function (req, res) {
// //   //   var elem = parseInt(req.params.index);
// //   //   var tempjournal = [];
// //   //   for (var i = 0; i < journalData.length; i++) {
// //   //     if (i !== elem) {
// //   //       tempjournal.push(journalData[i]);
// //   //     }
// //   //   }
// //   //   journalData = tempjournal;

// //   //   res.json("delete done");
// //   // });


// // }


const router = require('express').Router();
const notes  = require('../../db/db.json');
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
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify(notes)
    );
})

//delete a note
router.delete('/notes/:id', (req,res) => {
    const found = notes.some(note => note.id === req.params.id);
    if(found){
        res.json({msg: `Note deleted`, 
        notes: notes.filter(note=> note.id != req.params.id)});
    }
    else{
        res.status(400).json({msg: `No note with that id`});
    }
    //remove the note from the array
    notes.splice(notes.indexOf(notes.filter(note=> note.id === req.params.id)[0]),1);

    //write to json file
    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify(notes)
    );
})

module.exports = router;