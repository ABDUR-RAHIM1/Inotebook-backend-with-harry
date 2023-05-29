const router = require("express").Router()
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require('express-validator');
const NoteBook = require("../models/Notes.schema");

// get all notes from logged in  users 
router.get("/fetchAllNotes", fetchUser, async (req, res) => {
     try {
          const notes = await NoteBook.find({ user: req.user.id })
          res.json({ massge: "notes book here", notes })
     } catch (error) {
          console.log(error.message)
          res.status(500).send("Shomthing Went Wrong")
     }

})



// add a new notes from auth.. .users
router.post("/addNote", fetchUser, [
     body("title", "Enter a valid title").isLength({ min: 4 }),
     body("description", "description must be atleast 5 charectare ").isLength({ min: 6 }),
], async (req, res) => {

     const { title, description, tag } = req.body
     /// emaiil  error handler is here
     const error = validationResult(req);
     if (!error.isEmpty()) {
          return res.status(400).json({ error: error.array() })
     }


     try {
          const note = await new NoteBook({
               title, description, tag, user: req.user.id
          })

          const saveNote = await note.save()

          res.json({ massge: "notes book here", saveNote })
     } catch (error) {
          console.log(error.message)
          res.status(500).send("Shomthing Went Wrong")
     }
})

///  update notes with users id : login  must be require

router.put("/updateNote/:id", fetchUser, async (req, res) => {
     try {
          const { title, description, tag } = req.body;
          // create a new notewboook object 
          let newNote = {}
          if (title) { newNote.title = title }
          if (description) { newNote.description = description }
          if (description) { newNote.description = description }

          /// find user by Id 
          let note = await NoteBook.findById(req.params.id)
          if (!note) {
               return res.status(404).send("user Not Found")
          }

          if (note.user.toString() !== req.user.id) {
               return res.status(401).send("Not Allowed")
          }

          note = await NoteBook.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
          res.json({ note })

     } catch (error) {
          console.log(error.message)
          res.status(500).send("Shomthing Went Wrong")
     }
})



///    delete note from database 

router.delete("/deleteNote/:id", fetchUser, async (req, res) => {
     try {  
          /// find user by Id 
          let note = await NoteBook.findById(req.params.id)
          if (!note) {
               return res.status(404).send("user Not Found")
          }

          if (note.user.toString() !== req.user.id) {
               return res.status(401).send("Not Allowed")
          }

          note = await NoteBook.findByIdAndDelete(req.params.id)

          res.json({ "success" : "Note has been deleted", note })

     } catch (error) {
          console.log(error.message)
          res.status(500).send("Shomthing Went Wrong")
     }
})

module.exports = router;