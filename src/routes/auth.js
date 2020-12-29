const jwt = require('jsonwebtoken');
const settings = require('../settings/jwt.json');

class Authenticate {
  static withJwt = (req, res, next) => {
    const header = req.headers.authorization;

    if(header) {
      const token = header.split(' ')[1];
  
      jwt.verify(token, settings.secret, (err, user) => {
        if(err) {
          return res.sendStatus(403);
        }
  
        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  }
}

module.exports = {
  withJwt: Authenticate.withJwt
}