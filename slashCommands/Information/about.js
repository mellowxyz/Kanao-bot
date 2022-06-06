const { MessageEmbed, CommandInteraction, Client, MessageButton, MessageActionRow } = require("discord.js")

module.exports = {
    name: "about",
    description: "Show kanao project information",

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
    .setLabel("Invite")
    .setStyle("LINK")
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=36768832&scope=applications.commands%20bot`),
    new MessageButton()
    .setLabel("GitHub")
    .setStyle("LINK")
    .setURL("https://github.com/brblacky/lavamusic"),
    new MessageButton()
    .setLabel("Support")
    .setStyle("LINK")
    .setURL("https://discord.gg/gfcv94hDhv")
			);

            const mainPage = new MessageEmbed()
            .setAuthor({ name: `${client.user.tag}`, iconURL: `${client.user.displayAvatarURL({ dynamic: true })}`})
            .setThumbnail(`${client.user.displayAvatarURL({ dynamic: true })}`)
            .setColor(client.embedColor)
            .setTimestamp()
            .addField('<:kanao_owner:980746046835683368> Creator', '[mellow.org](https://github.com/mellowxyz)', true)
            .addField('<:kanao_org:980745978434949160> Organization', '[.org team](https://discord.gg/dworld)', true)
            .addField('<:kanao_comm:980746093962866698> Community', '[Click here](https://discord.gg/dworld)', true)
            .addField('<:kanao_general:980701116742397972> Information', 'Kanao is a heavily modified version of the open source bot called [lavamusic](https://github.com/brblacky/lavamusic). This bot isn\'t no way affiliated with the developers of lavamusic. For this bot related questions or help, please join this bot support using the `support` command. Thanks for using me!')
        await interaction.followUp({embeds: [mainPage]});
    }
}
