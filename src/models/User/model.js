const {DataTypes} = require("sequelize");
const bcrypt = require('bcrypt');
const {sequelize} = require("../../database/index");

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    required: true,
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    required: true,
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    required: true,
    type: DataTypes.STRING
  },

  coins: {
    defaultValue: 20,
    type: DataTypes.INTEGER
  }
}, {
  hooks: {
    beforeCreate: (instance) => {
      return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(instance.password, salt, (err, hash) => {
            instance.password = hash;
            return resolve(instance);
          });
        });
      });
    }
  }
});

User.prototype.validPassword = async function(input) {
  return await bcrypt.compare(input, this.password);
};

User.prototype.toJSON = function () {
  var values = Object.assign({}, this.get());

  delete values.password;
  return values;
}

module.exports = User;
