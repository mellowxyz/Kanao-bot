const { MessageEmbed, CommandInteraction, Client, MessageButton, MessageActionRow } = require("discord.js")

module.exports = {
    name: "invite",
    description: "get my invite link",

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        await interaction.deferReply({
            ephemeral: false
        });


        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel("Bot Invite")
                    .setStyle("LINK")
                    .setEmoji("<:emoji_9:980754201334386698>")
                    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=36768832&scope=applications.commands%20bot`),
                new MessageButton()
                    .setLabel("Support")
                    .setStyle("LINK")
                    .setEmoji("<:emoji_9:980754201334386698>")
                    .setURL("https://discord.gg/dworld")
            );

        const mainPage = new MessageEmbed()
            .setAuthor({ name: `${client.user.tag}`, iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
            //.setThumbnail(`${client.user.displayAvatarURL({ dynamic: true })}`)
            .setColor(client.embedColor)
            .addField('<:emoji_9:980754201334386698> Bot Invite', `[Click Here](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=36768832&scope=applications.commands%20bot)`, true)
            .addField('<:emoji_9:980754201334386698> Support Invite', `[Click Here](https://discord.gg/dworld)`, true)
            .setTimestamp()
            .setFooter({ text: `Requested by ${interaction.user.username}` })
        await interaction.followUp({ embeds: [mainPage], components: [row] })
    }
}
