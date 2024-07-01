const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = (req, res, next) => {
    console.log(req.headers.authorization);
    try {
        const token = req.headers.authorization.split(" ")[1];
        const verify = jwt.verify(token, process.env.JWT);
        console.log(verify);
        if (verify.userType == 'admin') {
            next()
        } else {
            res.status(401).json({
                message: "User is not valid"
            })
        }

    } catch (error) {
        return res.status(401).json({
            message: "not a valid user"
        })
    }
}
