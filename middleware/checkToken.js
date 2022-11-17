const jwt = require('jsonwebtoken')
const _CONF = require('../config/')

module.exports = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  // decode token
  if (bearerHeader) {
    // verifies secret and checks exp
    jwt.verify(bearerHeader.split(' ')[1], _CONF.SECRET, function(err, decoded) {
        if (err) {
            console.error(err.toString());
            //if (err) throw new Error(err)
            return res.status(401).json({"error": true, "message": 'Unauthorized access.', err });
        }
        console.log(`decoded>>${decoded}`);
        req.decoded = decoded;
        next();
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
        "error": true,
        "message": 'No token provided.'
    });
  }
}

function getToken(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  } 
  return null;
}