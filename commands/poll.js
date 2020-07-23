const Discord = require("discord.js");
module.exports = {
  name: "poll",
  description: "Create a poll!",
  execute(message, args) {
    if (args[2] != undefined) {
      // Checks for keyword 'help'.
      if (args[2].toLowerCase() === "help") {
        const exampleEmbed = new Discord.MessageEmbed()
          .setColor("#54913B")
          .addFields({
            name: "Create a poll!",
            value:
              "Create a poll eg: ` !speshal poll Do you like huge balloons? \"Yes\" \"No\" \"The bigger the better\"`",
          })
          .setFooter("Speshal Bot - 2020", "https://i.imgur.com/s7CCC6v.png");
        message.channel.send(exampleEmbed);
        return;
      }

      const options = [
        "🇦",
        "🇧",
        "🇨",
        "🇩",
        "🇪",
        "🇫",
        "🇬",
        "🇭",
        "🇮",
        "🇯",
        "🇰",
        "🇱",
        "🇲",
        "🇳",
        "🇴",
        "🇵",
        "🇶",
        "🇷",
        "🇸",
        "🇹",
        "🇺",
        "🇻",
        "🇼",
        "🇽",
        "🇾",
        "🇿",
      ];

      if (message.member.hasPermission("MANAGE_MESSAGES")) {
        let question = [];

        for (let i = 2; i < args.length; i++) {
          if (args[i].startsWith('"')) break;
          else question.push(args[i]);
        }

        question = question.join(" ");
        // Defining the choices...
        const choices = [];

        const regex = /(["'])((?:\\\1|\1\1|(?!\1).)*)\1/g;
        let match;
        while ((match = regex.exec(args.join(" ")))) choices.push(match[2]);

        // Creating and sending embed...
        let content = [];
        for (let i = 0; i < choices.length; i++)
          content.push(`${options[i]} ${choices[i]}`);
        content = content.join("\n");

        var embed = new Discord.MessageEmbed()
          .setColor("#54913B")
          .setTitle(`**${question}**`)
          .setDescription(content);

        message.channel
          .send(`:bar_chart: ${message.guild.name} started a poll.`, embed)
          .then(async (m) => {
            for (let i = 0; i < choices.length; i++) await m.react(options[i]);
          });

          message.delete();
      } else {
        message.channel
          .send("`You have no permission to create polls.`")
          .then((msg) => {
            msg.delete({ timeout: 7000 });
          });
      }
    } else {
      message.react("❌");
      message.channel.send(
        "`Did you type the command correctly? Type '!speshal poll help' for more info.`"
      );
      return;
    }
  },
};
