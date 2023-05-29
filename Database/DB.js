const mongoose = require("mongoose");

const mongoURL = 'mongodb+srv://abrar:3NUfKV42ivL3fxNm@cluster0.ekd31bu.mongodb.net/admin1?retryWrites=true&w=majority'

const connectDB =async ()=>{
    try {
      await  mongoose.connect(mongoURL)
        console.log("Database is Connected")
    } catch (error) {
         console.log("ERROR", error)
    }
}

module.exports = connectDB;