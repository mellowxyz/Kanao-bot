const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    category: "Information",
    description: "Check Ping Bot",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    cooldown: 10,
    execute: async (message, args, client, prefix) => {
      
  await message.reply({ content: "Pinging..." }).then(async (msg) => {
  const ping = msg.createdAt - message.createdAt;
  const api_ping = client.ws.ping;

  const PingEmbed = new MessageEmbed()
    .setAuthor({ name: `${client.user.tag}`, iconURL: client.user.displayAvatarURL()})
    .setColor(client.embedColor)
    .setTitle("Pong!")
    .addField("<:kanao_wsping:980755348438794290> API Latency", `\`\`\`ini\n${api_ping}ms \n\`\`\``, true)
    .addField("<:kanao_botping:980755385877143592> Bot Latency", `\`\`\`ini\n${ping}ms \n\`\`\``, true)
    .setFooter({ text: `Requested by ${message.author.username}`, iconURL:  message.author.avatarURL({ dynamic: true })})
    .setTimestamp();

  await msg.edit({ content: "**Pong!**", embeds: [PingEmbed] })

 })
 }
}