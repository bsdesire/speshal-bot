const Discord = require('discord.js');
module.exports = {
	name: 'purge',
	description: 'Purge channel messages!',
	execute(message, prefix, args) {
        if(args[2]!=undefined){
        // Checks for keyword 'help'.
        if(args[2].toLowerCase() === 'help'){
            const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#54913B')
                .addFields(
                    { name: 'Purge messages!', value: 'Purge a number of messages in this channel eg: ` '+prefix+' purge 20 `' },
                     )
                .setFooter('Speshal Bot - 2020', 'https://i.imgur.com/s7CCC6v.png');
            message.channel.send(exampleEmbed);
            return;
        }

        let numOfMessages = args[2];
        // Checks if the number is correct in arg2.
        var regexPat = new RegExp(/[0-9]{1,3}/);
        var res = regexPat.test(numOfMessages);
        if(!res){
            // If the number specified is NaN or too damn high.
            message.react('❌');
            message.channel.send("`Did you specify a number? Maybe it was too damn high (1-999). Type '"+prefix+" admin help' for more.`");
            return;
        }
        if(message.member.hasPermission('MANAGE_MESSAGES')){
            if(message.guild.me.hasPermission("MANAGE_MESSAGES")){
            numOfMessages++;
            message.channel.bulkDelete(numOfMessages).then(msg => message.channel.send("`Purged " + msg.size + " messages.`").then(msg => {
                msg.delete({ timeout: 7000 })
              }));      
            }else{
                message.channel.send("`The bot has no permission to delete messages. Permission [MANAGE_MESSAGES]`").then(msg => {
                    msg.delete({ timeout: 7000 })
                  });
            }
        }else{
            message.channel.send("`You have no permission to delete messages. Permission [MANAGE_MESSAGES]`").then(msg => {
                msg.delete({ timeout: 7000 })
              });
        }
    }else{
        message.react('❌');
        message.channel.send("`Did you type the command correctly? Type '"+prefix+" purge help' for more info.`");
        return;
    }},
};