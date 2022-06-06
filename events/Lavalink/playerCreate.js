const { MessageEmbed } = require("discord.js");

module.exports = async (client, player) => {

	client.logger.log(`Player has been created in ${player.guild}`, "log");
	const channel = client.channels.cache.get("981058853875642408");
    const embed = new MessageEmbed()
      .setAuthor({
        name: `${client.user.tag}`,
        iconURL: `${client.user.displayAvatarURL()}`,
      })
      .setTitle(`Player Logs`)
      .setDescription(`Player created`)
      .setFooter({
        text: `${client.user.username} logger`,
        iconURL: `https://cdn.discordapp.com/emojis/980755385877143592.png`,
      })
      .addField(`Guild`, `\`\`\`ini\n [ ${player.guild} ] \n\`\`\``)
      .addField(`Latency`, `\`\`\`ini\n [ ${client.ws.ping} ] \n\`\`\``)
      .setColor(client.embedColor)
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp();
    channel.send({ embeds: [embed] });
}