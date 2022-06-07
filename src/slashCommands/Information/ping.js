const { MessageEmbed, CommandInteraction, Client } = require("discord.js")

module.exports = {
    name: "ping",
    description: "return websocket ping",

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        await interaction.deferReply({
            ephemeral: false
        });
        await interaction.editReply({ content: "Pining..." }).then(async () => {
            const ping = Date.now() - interaction.createdAt;
            const api_ping = client.ws.ping;

            const PingEmbed = new MessageEmbed()
                .setAuthor({ name: `${client.user.tag}`, iconURL: client.user.displayAvatarURL() })
                .setColor(client.embedColor)
                .setTitle("Pong!")
                .addField("<:kanao_wsping:980755348438794290> API Latency", `\`\`\`ini\n${api_ping}ms \n\`\`\``, true)
                .addField("<:kanao_botping:980755385877143592> Bot Latency", `\`\`\`ini\n${ping}ms \n\`\`\``, true)
                .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.avatarURL({ dynamic: true }) })
                .setTimestamp();

            await interaction.editReply({
                content: "`🏓`",
                embeds: [PingEmbed]
            });
        })
    }
}