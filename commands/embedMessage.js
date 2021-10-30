const Discord = require('discord.js');

module.exports = {
    name: 'embedMessage',
    description: 'Speshal message embedding!',
    execute(message, client, disbut) {
            const exampleEmbed = new Discord.MessageEmbed()
                .setColor("#000000")
                .setTitle('New Crack!')
                .setThumbnail('https://i.imgur.com/h4WFKTb.png')
                .setDescription("Game Name")
                .addField('Cracked by: Group name, Time ago: timeAgo', false)
                .setTimestamp()

            let button = new disbut.MessageButton()
                .setStyle('green')
                .setLabel('Button')
                .setID('id1')
            client.channels.cache.get('806319489754726422').send(exampleEmbed,button);
            return;

    },
};