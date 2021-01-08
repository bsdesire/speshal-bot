const Discord = require("discord.js");
module.exports = {
  name: "amongus",
  description: "Auto switch for among us.",
  execute(message, prefix, args) {
    if (message.member.voice.channel) {
      let mutedChannel = message.guild.channels.cache.get("743871470513684610");
      let talkingChannel = message.guild.channels.cache.get("743829030045876284");
      for (const [memberID, member] of talkingChannel.members) {
        if (
          member.roles.cache.find((role) => role.id === "743873781629714554")
        ) {
          member.voice.setChannel(mutedChannel);
          console.log("moveToMute");
        }
      }
      for (const [memberID, member] of mutedChannel.members) {
        if (
          member.roles.cache.find((role) => role.id === "743873781629714554")
        ) {
          member.voice.setChannel(talkingChannel);
          console.log("moveToTalking");
        }
      }
    } else {
      message.reply("You are not in a voice channel!");
    }
  },
};
