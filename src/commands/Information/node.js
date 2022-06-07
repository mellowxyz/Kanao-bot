const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "node",
    category: "Information",
    description: "Check node information",
    args: false,
    usage: "",
    permission: [],
    owner: false,
 execute: async (message, args, client, prefix, node) => {

     const namestat = client.manager.nodes.map(node => 
            `${(node.options.identifier)}`)

     const playerstats = client.manager.nodes.map(node => 
            `Connected Player: ${node.stats.players}` +
            `\nPlaying players: ${node.stats.playingPlayers}` +
            `\nPlayer uptime: ${new Date(node.stats.uptime).toISOString().slice(11, 19)}`)

     const cpustats = client.manager.nodes.map(node => 
            `Cores: ${node.stats.cpu.cores}` +
            `\nSystem load: ${(Math.round(node.stats.cpu.systemLoad * 100) / 100).toFixed(2)}%` +
            `\nLavalink load: ${(Math.round(node.stats.cpu.lavalinkLoad * 100) / 100).toFixed(2)}%`)

            /*
            `\n\nMemory` +
            `\nReservable Memory: ${Math.round(node.stats.memory.reservable / 1024 / 1024)}mb` +
            `\nUsed Memory: ${Math.round(node.stats.memory.used / 1024 / 1024)}mb` +
            `\nFree Memory: ${Math.round(node.stats.memory.free / 1024 / 1024)}mb` +
            `\nAllocated Memory: ${Math.round(node.stats.memory.allocated / 1024 / 1024)}mb` +
            "\n\nCPU" +
            `\nCores: ${node.stats.cpu.cores}` +
            `\nSystem Load: ${(Math.round(node.stats.cpu.systemLoad * 100) / 100).toFixed(2)}%` +
            `\nLavalink Load: ${(Math.round(node.stats.cpu.lavalinkLoad * 100) / 100).toFixed(2)}%`
        ).join('\n\n----------------------------\n');
        */

        const embed = new MessageEmbed()
            .setAuthor({ name: `${client.user.tag}`, iconURL: client.user.displayAvatarURL()})
            .setTitle('Lavalink Statistics')
            .setDescription(`${namestat} Connected`)
            .addField(`<:emoji_29:980920035881127986> Player Stats`, `${playerstats}`)
            .addField(`<:emoji_28:980920004574867477> Cpu Stats`, `${cpustats}`)
            .setFooter({ text: `Requested by ${message.author.username}`})
            .setTimestamp()
            .setThumbnail(client.user.displayAvatarURL())
            .setColor(client.embedColor)
            .setFooter({ text:`Requested by ${message.author.tag}` })
        message.reply({embeds: [embed]})
    }
                                          }
