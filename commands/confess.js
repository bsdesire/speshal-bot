const Discord = require('discord.js');
module.exports = {
	name: 'confess',
	description: 'Speshal confessionary!',
	execute(message, args, client) {
        if(message.channel.type === "dm"){
            args.splice(0,1);
            var randomColor = Math.floor(Math.random()*16777215).toString(16);
            //client.channels.cache.get('711425209542115328').send(args.join(" "));
            const exampleEmbed = new Discord.MessageEmbed()
            .setColor("#54913B")
                .setColor('#' + randomColor)
                .setDescription(args.join(" "))
                client.channels.cache.get('796642221603815424').send(exampleEmbed);
            return;
        }

    },
};