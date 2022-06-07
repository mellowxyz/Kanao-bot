const { ClientApplication } = require("discord.js");

module.exports = {
    name: "error",
    run: async (client, error) => {

      return client.utils.sendErrorLog(client, error, "error");

    }
  };