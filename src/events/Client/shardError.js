const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "shardError",
  run: async (client, error, id) => {
  client.logger.log(`Shard #${id} Errored`, "error");

  const hms = require('humanize-duration')(client.uptime); 
  
  const channel = client.channels.cache.get("981046944929562624");
    const embed = new MessageEmbed()
    .setAuthor({
      name: `${client.user.tag}`,
      iconURL: `${client.user.displayAvatarURL()}`
    })
      .setTitle(`Shard Logs`)
      .setDescription(`Shard #${id} encountered an error`)
      .setFooter({ 
        text: `${client.user.username} logger`,
        iconURL: `https://cdn.discordapp.com/emojis/980755385877143592.png`
       })
      .addField(`Latency`, `\`\`\`ini\n [ ${client.ws.ping} ] \n\`\`\``)
      .addField(`Uptime`, `\`\`\`ini\n [ ${hms} ] \n\`\`\``)
      .setColor(client.embedColor)
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp()
    channel.send({ embeds: [embed] });

  }
};