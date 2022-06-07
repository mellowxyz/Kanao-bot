const {
  MessageEmbed,
  Permissions,
  MessageActionRow,
  MessageButton,
  Collection,
  MessageAttachment
} = require("discord.js");
const db = require("../../schema/prefix.js");
const db2 = require("../../schema/dj");

module.exports = {
  name: "messageCreate",
  run: async (client, message) => {
    if (message.author.bot) return;
    if (!message.guild) return;
    let prefix = client.prefix;
    const channel = message?.channel;
    const ress = await db.findOne({ Guild: message.guildId });
    if (ress && ress.Prefix) prefix = ress.Prefix;

    let datab = client.owner;

    const mentionRegexPrefix = RegExp(`^<@!?${client.user.id}>`);
    if (message.content.match(mentionRegexPrefix)) {
      const row = new MessageActionRow().addComponents(
        new MessageButton()
          .setLabel("Bot Invite")
          .setStyle("LINK")
          .setEmoji("<:emoji_9:980754201334386698>")
          .setURL(
            `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=36768832&scope=applications.commands%20bot`
          ),
        new MessageButton()
          .setLabel("Support")
          .setStyle("LINK")
          .setEmoji("<:emoji_9:980754201334386698>")
          .setURL("https://discord.gg/dworld")
      );

      const mainPage = new MessageEmbed()
        .setAuthor({
          name: `${client.user.tag}`,
          iconURL: `${client.user.displayAvatarURL({ dynamic: true })}`,
        })
        //.setThumbnail(`${client.user.displayAvatarURL({ dynamic: true })}`)
        .setTitle(`Hello! I'm ${client.user.username}`)
        .setDescription("I'm a music bot with various features!")
        .setColor(client.embedColor)
        .addField("Need help?", `Type \`${prefix}help\` for the list of commands.`)
        .addField(
          "<:emoji_9:980754201334386698> Bot Invite",
          `[Click Here](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=36768832&scope=applications.commands%20bot)`,
          true
        )
        .addField(
          "<:emoji_9:980754201334386698> Support Invite",
          `[Click Here](https://discord.gg/dworld)`,
          true
        )
        .setTimestamp()
        .setFooter({ text: `Requested by ${message.author.username}` });
      message.reply({ embeds: [mainPage], components: [row] });
    }

    const prefix1 = message.content.match(mentionRegexPrefix)
      ? message.content.match(mentionRegexPrefix)[0]
      : prefix;

    if (!datab.includes(message.author.id)) {
      if (!message.content.startsWith(prefix1)) return;
    }

    const args =
      datab.includes(message.author.id) == false
        ? message.content.slice(prefix1.length).trim().split(/ +/)
        : message.content.startsWith(prefix1) == true
          ? message.content.slice(prefix1.length).trim().split(/ +/)
          : message.content.trim().split(/ +/);

    const commandName = args.shift().toLowerCase();

    const command =
      client.commands.get(commandName) ||
      client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );

    if (!command) return;
    if (!message.guild.me.permissions.has(Permissions.FLAGS.SEND_MESSAGES))
      return await message.author.dmChannel
        .send({
          content: `I don't have **\`SEND_MESSAGES\`** permission in <#${message.channelId}> to execute this **\`${command.name}\`** command.`,
        })
        .catch(() => { });

    if (!message.guild.me.permissions.has(Permissions.FLAGS.VIEW_CHANNEL))
      return;

    if (!message.guild.me.permissions.has(Permissions.FLAGS.EMBED_LINKS))
      return await message.channel
        .send({
          content: `I don't have **\`EMBED_LINKS\`** permission to execute this **\`${command.name}\`** command.`,
        })
        .catch(() => { });

        const embed = new MessageEmbed().setColor("RED");

        const row = new MessageActionRow().addComponents(
          new MessageButton()
            .setLabel("Bot Invite")
            .setStyle("LINK")
            .setEmoji("<:emoji_9:980754201334386698>")
            .setURL(
              `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=36768832&scope=applications.commands%20bot`
            ),
          new MessageButton()
            .setLabel("Support")
            .setStyle("LINK")
            .setEmoji("<:emoji_9:980754201334386698>")
            .setURL("https://discord.gg/dworld")
        );
      
        if (command.args && !args.length) {
          let reply = `You didn't provide any arguments`;
      
          // usage: '',
          if (command.usage) {
            let cusa = `\`${prefix}${command.name} ${command.usage}\``;
          }
          embed.setTitle("Incorrect Usage");
          embed.setTimestamp();
          embed.setThumbnail(message.author.displayAvatarURL({ dynamic: true }));
          embed.setFooter({ text: `Requested by ${message.author.username}` });
          embed.addField("Correct Usage", `\`\`\`js\n${prefix}${command.name} ${command.usage}\n\`\`\``);
          embed.addField("Example Usage", `\`\`\`js\n${prefix}${command.name} ${command.example}\n\`\`\``);
          embed.setDescription(reply);
          return message.reply({ embeds: [embed], components: [row] });
        }

    if (
      command.permission &&
      !message.member.permissions.has(command.permission)
    ) {
      embed.setDescription("You can't use this command.");
      return message.channel.send({ embeds: [embed] });
    }
    if (
      !channel
        .permissionsFor(message.guild.me)
        ?.has(Permissions.FLAGS.EMBED_LINKS) &&
      client.user.id !== userId
    ) {
      return channel.send({
        content: `Error: I need \`EMBED_LINKS\` permission for this.`,
      });
    }
    if (command.owner && message.author.id !== `${client.owner}`) {
      embed.setDescription(`Only ${client.users.cache.get(client.owner).tag} can use this command!`);
      return message.channel.send({ embeds: [embed] });
    }

    const player = message.client.manager.get(message.guild.id);

    if (command.player && !player) {
      embed.setDescription("There is no player for this guild.");
      return message.channel.send({ embeds: [embed] });
    }

    if (command.inVoiceChannel && !message.member.voice.channelId) {
      embed.setDescription("You must be in a voice channel!");
      return message.channel.send({ embeds: [embed] });
    }

    if (command.sameVoiceChannel) {
      if (message.guild.me.voice.channel) {
        if (
          message.guild.me.voice.channelId !== message.member.voice.channelId
        ) {
          embed.setDescription(
            `You must be in the same channel as ${message.client.user}!`
          );
          return message.channel.send({ embeds: [embed] });
        }
      }
    }

    const { cooldowns } = client;

    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply({
          content: `please wait ${timeLeft.toFixed(
            1
          )} more seconds before reusing the \`${command.name}\` command.`,
        }).then(msg => { setTimeout(() => { msg.delete() }, 10000) });
      }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    if (command.dj) {
      let data = await db2.findOne({ Guild: message.guild.id });
      let perm = Permissions.FLAGS.MUTE_MEMBERS;
      if (data) {
        if (data.Mode) {
          let pass = false;
          if (data.Roles.length > 0) {
            message.member.roles.cache.forEach((x) => {
              let role = data.Roles.find((r) => r === x.id);
              if (role) pass = true;
            });
          }
          if (!pass && !message.member.permissions.has(perm))
            return message.channel.send({
              embeds: [
                embed.setDescription(
                  `You don't have permission or dj role to use this command`
                ),
              ],
            });
        }
      }
    }

    try {
      command.execute(message, args, client, prefix);
    } catch (error) {
      console.log(error);
      embed.setDescription(
        "There was an error executing that command.\nI have contacted the owner of the bot to fix it immediately."
      );
      return message.channel.send({ embeds: [embed] });
    }
  },
};
