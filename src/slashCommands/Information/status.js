
const { MessageEmbed, version, CommandInteraction, Client } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const os = require('os')
const si = require('systeminformation');

module.exports = {
    name: "status",
    description: "Show status bot",
    run: async (client, interaction) => {

        await interaction.deferReply({
            ephemeral: false
        });

        const duration1 = moment.duration(interaction.client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        const cpu = await si.cpu();
        const about = interaction.client.emoji.about;
        let ccount = client.channels.cache.size;
        let scount = client.guilds.cache.size;
        let mcount = 0;
        client.guilds.cache.forEach((guild) => {
            mcount += guild.memberCount

        })
        const embed = new MessageEmbed()
            .setAuthor({ name: `${client.user.tag}`, iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
            .setThumbnail(`${client.user.displayAvatarURL({ dynamic: true })}`)
            .setColor(client.embedColor)
            .setTitle('Bot Statistics')
            //.addField("<:kanao_owner:980746046835683368> Developer", `${client.users.cache.get(client.owner).username}`, true)
            .addField("<:kanao_servers:980754277163208706> Servers", `${scount}`, true)
            .addField("<:kanao_users:980754305860657172> Users", `${mcount}`, true)
            .addField("<:kanao_channel:980754388270346270> Channels", `${ccount}`, true)
            .addField("<:kanao_erela:980848953471946854> Erela.js", `v2.3.3`, true)
            .addField("<:kanao_js:980754253335392256> Discord.js", `v${version}`, true)
            .addField("<:kanao_node:980754228001783848> NodeJS", `${process.version}`, true)
            .setTimestamp()
            .setFooter({ text: `Requested by ${interaction.user.username}` })

        interaction.followUp({ embeds: [embed] });
    }
}

