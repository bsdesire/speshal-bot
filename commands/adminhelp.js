const Discord = require('discord.js');
module.exports = {
	name: 'adminhelp',
	description: 'Speshal Admin Help!',
	execute(message, prefix, args) {
        // Checks for keyword 'help'.
            const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#54913B')
                .setTitle('Speshal Bot')
                .setThumbnail('https://i.imgur.com/z6pRGtP.png')
                .addFields(
                    { name: 'Create a poll!', value: 'To create a poll type `'+prefix+' poll help`' },
                    { name: 'Set configurations!', value: 'To set configs type `'+prefix+' set {parameter} {newValue}`' },
                    { name: 'Check current configurations!', value: 'To show current configs type `'+prefix+' showconf`' },
                )
                .setTimestamp()
                .setFooter('Speshal Bot - 2020', 'https://i.imgur.com/s7CCC6v.png');
            message.channel.send(exampleEmbed);
            return;

    },
};