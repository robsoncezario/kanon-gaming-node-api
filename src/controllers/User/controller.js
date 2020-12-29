const jwt = require('jsonwebtoken');
const User = require("../../models/User/model");
const settings = require("../../settings/jwt.json");

class UserController {
  static register = async (request, response) => {
    const {name, email, password} = request.body;

    try {
      User.create({
        name: name,
        email: email.toLowerCase(),
        password: password
      }).then((user) => {
        const token = jwt.sign({id: user.id}, settings.secret,
        { 
          expiresIn: '60m'
        });
    
        response.status(201);
        response.json({
          user: user.toJSON(),
          token: token
        });
      }).catch((err) => {
        const getErrorMessage = (err) => {
          switch(true) {
            case err?.original?.code === 'ER_DUP_ENTRY':
              return 'This e-mail address is already in use.';
            case err?.errors[0]?.path === 'email': 
              return 'Please, use a valid e-mail address.';
            case err?.errors[0]?.path === 'name': 
              return 'Name is required for this.';
            default: 
              return 'Unknown error';
          }
        }

        response.status(500);
        response.json({
          code: err.code,
          error: getErrorMessage(err)
        });
      });
    } catch(err) {
      response.status(500);
      response.json({
        code: 1472,
        error: 'Unknown error'
      });
    }
  }

  static loginWithToken = async (request, response) => {
    const data = request.user;

    try {
      const user = await User.findByPk(data.id);
      const token = jwt.sign({id: user.id}, settings.secret,
      { 
        expiresIn: '60m'
      });
  
      response.status(200);
      response.json({
        user: user,
        token: token
      });
    } catch {
      response.status(401);
    }
  }

  static login = async (request, response) => {
    const {email, password} = request.body;

    User.findOne({
      where: {
        email: email.toLowerCase()
      }
    }).then(async (user) => {
      const check = await user.validPassword(password);

      if(!check) {
        response.status(500);
        response.json({
          code: 1433,
          error: "Credentials doesn't match."
        });
        return;
      }

      const token = jwt.sign({id: user.id}, settings.secret,
      { 
        expiresIn: '60m'
      });

      response.status(200);
      response.json({
        user: user.toJSON(),
        token: token
      });
    }).catch(() => {
      response.status(500);
      response.json({
        code: 1433,
        error: "Credentials doesn't match."
      });
    });
  }
}

module.exports = {
  register: UserController.register,
  login: UserController.login,
  loginWithToken: UserController.loginWithToken
};