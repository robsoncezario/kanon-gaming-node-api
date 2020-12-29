const { Sequelize } = require("sequelize");
const dbSettings = require("../settings/database.json");

const sequelize = new Sequelize(dbSettings.connection);

module.exports = {
  sequelize: sequelize,

  async connect () {
    try {
      await sequelize.authenticate();

      console.log(`[Database] Connection to ${dbSettings.connection.host}:${dbSettings.connection.port} successfully established.`);
    } catch (error) {
      console.log(`[Database] Connection to ${dbSettings.connection.host}:${dbSettings.connection.port} failed`);
    }
  },

  async close () {
    await sequelize.close();
  }
};
