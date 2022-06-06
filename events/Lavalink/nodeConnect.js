const { MessageEmbed } = require("discord.js");

module.exports = async (client, node) => {

	client.logger.log(`Node "${node.options.identifier}" connected.`, "ready");

	const channel = client.channels.cache.get("981059807450636309");
    const embed = new MessageEmbed()
      .setAuthor({
        name: `${client.user.tag}`,
        iconURL: `${client.user.displayAvatarURL()}`,
      })
      .setTitle(`Lavalink Node Logs`)
      .setDescription(`${node.options.identifier} connected`)
      .setFooter({
        text: `${client.user.username} logger`,
        iconURL: `https://cdn.discordapp.com/emojis/980755385877143592.png`,
      })
      .addField(`Load`, `\`\`\`ini\n [ ${(Math.round(node.stats.cpu.lavalinkLoad * 100) / 100).toFixed(2)}% ] \n\`\`\``)
      .addField(`Uptime`, `\`\`\`ini\n [ ${new Date(node.stats.uptime).toISOString().slice(11, 19)} ] \n\`\`\``)
      .setColor(client.embedColor)
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp();
    channel.send({ embeds: [embed] });

}