const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "invite",
    category: "Information",
    aliases: [ "addme" ],
    description: "invite LavaMusic",
    args: false,
    usage: "",
    permission: [],
    owner: false,
   execute: async (message, args, client, prefix) => {
         
         
    const row = new MessageActionRow()
			.addComponents(
    new MessageButton()
    .setLabel("Bot Support")
    .setStyle("LINK")
    .setEmoji("<:emoji_9:980754201334386698>")
    .setURL(`https://discord.gg/dworld`),
    new MessageButton()
    .setLabel("Bot Invite")
    .setStyle("LINK")
    .setEmoji("<:emoji_9:980754201334386698>")
    .setURL("https://discord.com/api/oauth2/authorize?client_id=892164897834696765&permissions=36768832&scope=applications.commands%20bot")
			);

          const mainPage = new MessageEmbed()
            .setAuthor({ name: `${client.user.tag}`, iconURL: `${client.user.displayAvatarURL({ dynamic: true })}`})
            //.setThumbnail(`${client.user.displayAvatarURL({ dynamic: true })}`)
            .setColor(client.embedColor)
            .addField('<:emoji_9:980754201334386698> Bot Support', `[Click Here](https://discord.gg/dworld)`, true)
            .addField('<:emoji_9:980754201334386698> Bot Invite', `[Click Here](https://discord.com/api/oauth2/authorize?client_id=892164897834696765&permissions=36768832&scope=applications.commands%20bot)`, true)
            .setTimestamp()
            .setFooter({text: `Requested by ${message.author.username}`})
           message.reply({embeds: [mainPage], components: [row]})
    }
}
