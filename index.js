const app = require("./app");  
const connectDB = require("./Database/Db"); 
const PORT = 5000;

connectDB()
 
app.listen(PORT, () => {
    console.log( `Server Is Running On Port : http://localhost:${PORT}`)
})
 