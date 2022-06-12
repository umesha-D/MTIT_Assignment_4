const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
    const token = req.headers.token;
    if(!token){
        res.send('Token not provided');
    }

    jwt.verify(token, process.env.TOKENSCRET , function(err, decoded) {
        if(err){
            res.send('Invalid token provided');
        }
        
        req.user = decoded;
        next();
    });
}

module.exports = validateToken;