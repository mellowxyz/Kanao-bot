const { prefix } = require("../../config.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ready",
  run: async (client) => {
    client.manager.init(client.user.id);
    client.logger.log(`${client.user.username} online!`, "ready");
    client.logger.log(
      `Ready on ${
        client.guilds.cache.size
      } servers, for a total of ${client.guilds.cache.reduce(
        (a, g) => a + g.memberCount,
        0
      )} users`,
      "ready"
    );

    const hms = require("humanize-duration")(client.uptime);

    const channel = client.channels.cache.get("981057852925947904");
    const embed = new MessageEmbed()
      .setAuthor({
        name: `${client.user.tag}`,
        iconURL: `${client.user.displayAvatarURL()}`,
      })
      .setTitle(`On-Ready Logs`)
      .setDescription(`Client connected with websocket`)
      .setFooter({
        text: `${client.user.username} logger`,
        iconURL: `https://cdn.discordapp.com/emojis/980755385877143592.png`,
      })
      .addField(`Latency`, `\`\`\`ini\n [ ${client.ws.ping} ] \n\`\`\``)
      .addField(`Uptime`, `\`\`\`ini\n [ ${hms} ] \n\`\`\``)
      .setColor(client.embedColor)
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp();
    channel.send({ embeds: [embed] });

    //Game
    let statuses = ["k!help | Kanao", `Prefix ${prefix}`];
    setInterval(function () {
      let status = statuses[Math.floor(Math.random() * statuses.length)];
      client.user.setActivity(status, { type: "PLAYING" });
    }, 10000);
  },
};
