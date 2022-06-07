const DJS = require("discord.js");

    /**
 * Send error log to discord channel
 * @param {DJS.Client} client
 * @param {DJS.DiscordAPIError | DJS.HTTPError | Error } error
 * @param {"warning" | "error"} type
 */
async function sendErrorLog(client, error, type) {
    try {
      if (
        error.message?.includes("Missing Access") ||
        error.message?.includes("Unknown Message") ||
        error.message?.includes("Missing Permissions")
      ) return;
  
      
      const channelId = "981079991104180325";
      if (!channelId) {
        return client.loggerr.error("ERR_LOG", error);
      }
  
      const channel = (client.channels.cache.get(channelId) ||
        (await client.channels.fetch(channelId)));
  
      if (!channel || !havePermissions(channel)) {
        return client.loggerr.error("ERR_LOG", error);
      }
  
      const code = error.code || "N/A";
      const httpStatus = error.httpStatus || "N/A";
      const requestData = error.requestData ?? { json: {} };
      const name = error.name || "N/A";
      let stack = error.stack || error;
      let jsonString;
  
      try {
        jsonString = JSON.stringify(requestData.json, null, 2);
      } catch {
        jsonString = "";
      }
  
      if (typeof stack === "object") stack = JSON.stringify(stack);
  
      if (typeof stack === "string" && stack.length > 4096) {
        console.error(stack);
        stack = "An error occurred but was too long to send to Discord, check your console.";
      }
  
      const { codeBlock } = require("@discordjs/builders");
  
      const embed = new DJS.MessageEmbed()
        .setTitle("Error occurred")
        .addField("Name", name, true)
        .addField("Code", code.toString(), true)
        .addField("httpStatus", httpStatus.toString(), true)
        .addField("Timestamp", client.loggerr.now, true)
        .addField("Request data", codeBlock(jsonString?.substr(0, 1020)))
        .setDescription(`${codeBlock(stack)}`)
        .setColor(type === "error" ? "#2f3136" : "#2f3136");
  
      await channel.send({ embeds: [embed] });
    } catch (e) {
      console.error({ error });
      console.error(e);
    }
  }
 
