const Discord = require('discord.js');
module.exports = {
	name: 'help',
	description: 'Speshal Help!',
	execute(message, args) {
        // Checks for keyword 'help'.
            const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#54913B')
                .setTitle('Speshal Bot')
                .setAuthor('developed by desire', 'https://i.imgur.com/YdtIIfo.png', 'https://i.imgur.com/s7CCC6v.png')
                .setDescription('Just another discord bot.')
                .setThumbnail('https://i.imgur.com/z6pRGtP.png')
                .addFields(
                    { name: 'Actual Commands!', value: 'Color Picker! Type `!speshal color help`' },
                    { name: 'Where do we go from here?', value: 'More commands to come...' },
                )
                .setTimestamp()
                .setFooter('Speshal Bot - 2020', 'https://i.imgur.com/s7CCC6v.png');
            message.channel.send(exampleEmbed);
            return;

    },
};