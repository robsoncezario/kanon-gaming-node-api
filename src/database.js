

const database = require("./database/index");
const User = require("./models/User/model");

(async () => {
  await database.connect();
  await database.sequelize.sync({ force: false });
})();
