const jwt = require('jsonwebtoken');
const JWT_SCRET = 'abrisAgoo$boy'

const fetchUser = (req, res, next) => {

    const token = req.header("auth-token")
    if (!token) {
        res.status(401).json({ Massage: "please authentication user using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SCRET)
        req.user = data.user
    } catch (error) {
        res.json({ Error: "plase authenticate user using a valid token 2" })
    }

    next()
}

module.exports = fetchUser;