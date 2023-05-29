const express = require('express')
const app = express();
const bodyParser = require('body-parser');
app.use(express.json())  
app.use(bodyParser.urlencoded({ extended: true })) 

// routes middlewere
app.use("/api/auth", require('./routes/auth.routes'))
app.use("/api/notes", require('./routes/notes.routes'))
 
// home route 
app.get("/", (req, res)=>{
     res.send("Home routes")
})

// error handler
app.use((req, res, next)=>{
     res.send("page not found")
})
module.exports = app;