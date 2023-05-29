const router = require("express").Router()
const InoteUser = require("../models/Users.schema")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require("../middleware/fetchUser"); 

const JWT_SCRET = 'abrisAgoo$boy'

// get all users account 
router.get('/user', async (req, res) => {
  const user = await InoteUser.find()
  res.json(user)
})

/
/// ROUTE ONE : +> create user using : /api/auth
router.post("/register", [
  body("name", "Enter a valid Name").isLength({ min: 3 }),
  body("email", "Enter a Valid Email").isEmail(),
  body("password", "Enter A Valid Password ").isLength({ min: 6 }),

], async (req, res) => {

  /// emaiil  error handler is here
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() })
  }

  try {
    //  create valid email first check a unique email yes or not 
    let user = await InoteUser.findOne({ email: req.body.email })
    if (user) {
      return res.status(400).json({ Error: "Email Already Exist , please unique email and try again" })
    } else {
      const salt = await bcrypt.genSalt(10)
      const hashPasword = await bcrypt.hash(req.body.password, salt)

      user = await InoteUser.create({
        name: req.body.name,
        email: req.body.email,
        password: hashPasword,
      })
      const data = {
        user: {
          id: user.id
        }
      }
      const authToken = jwt.sign(data, JWT_SCRET);
      res.json({ authToken })

      // res.status(200).json({ massege: "user Created", user })
    }
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Shomthing Went Wrong")
  }

  //  replace .then catch to async await function
  // .then( user => res.json({massge :"create a user", user}))
  // .catch((err)=> {
  //      res.json({Massage :" Please Enter a unique Email"})
  // })

})

/// ROUTE ONE : +>  login user using : /api/auth
router.post("/login", [
  body("email", "Enter a Valid Email").isEmail(),
  body("password", "password cann't be empty").exists(),

], async (req, res) => {
  /// emaiil  error handler is here
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() })
  }

  const { email, password } = req.body;
  try {
    const user = await InoteUser.findOne({ email }); 
    if (!user) {
      return res.status(400).json({ error: "please try to logged in correct information 1" })
    }

    let matchPassword =  bcrypt.compare(password, user.password) 
    // console.log(matchPassword)
    
    if (!matchPassword) {
      return res.status(400).json({ error: "please try to logged in correct information 2" })
    }
    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SCRET);
    res.json({ authToken })

  } catch (error) {
    console.log(error.message)
    res.send("Shomthing went wrong")
  }

})



// ROUTE 3v +:>   get user with jwt token : require auth 

router.post("/getuser",fetchUser ,  async (req, res) => {
      try {
        const userId = req.user.id;
        const user = await InoteUser.findById(userId).select("-password")
        res.send(user) 
        console.log(user)
      } catch (error) {
        console.log(error.message)
        res.send("Shomthing went wrong")
      }
})

module.exports = router;