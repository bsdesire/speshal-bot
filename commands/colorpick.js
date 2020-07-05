const Discord = require('discord.js');
module.exports = {
	name: 'color',
	description: 'Change my color!',
	execute(message, args) {
        // Checks for keyword 'help'.
        if(args[2].toLowerCase() === 'help'){
            const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#54913B')
                .setTitle('Speshal Bot')
                .setAuthor('developed by desire', 'https://i.imgur.com/YdtIIfo.png', 'https://i.imgur.com/s7CCC6v.png')
                .setDescription('Just another discord bot.')
                .setThumbnail('https://i.imgur.com/z6pRGtP.png')
                .addFields(
                    { name: 'Color Picker!', value: 'Set your own color using hex code eg: `!speshal color #abc123`' },
                    { name: 'Where to find hex codes?', value: 'You can use a website like https://htmlcolorcodes.com/color-picker/ to pick your color! Pick one and copy the hex code "#XXXXXX" and use the command above!' },
                    { name: 'More websites?', value: "You can find them all over with a Google Search, but here's some more: \n https://www.rapidtables.com/web/color/html-color-codes.html \n https://www.colorhexa.com/ \n https://www.w3schools.com/colors/colors_picker.asp" },
                    { name: 'Some preset colors for you...', value: "#FFFFFF - White ⚪\n #FF0000 - Red 🔴\n #00FF00 - Green 💚\n #0000FF - Blue 📘\n #E1FF00 - Yellow 💛\n #FF9100 - Orange 🍊\n #E1A6FF - Pink 🌸" },
                )
                .setTimestamp()
                .setFooter('Speshal Bot - 2020', 'https://i.imgur.com/s7CCC6v.png');
            message.channel.send(exampleEmbed);
            return;
        }

        // Checks if the color is correct in argument 2.
        var regexPat = new RegExp(/#[0-9a-fA-F]{6}/);
        var res = regexPat.test(args[2]);
        if(!res){
            // If the color is not in hexadecimal or wrong do this:
            message.channel.send("`Specified color ("+args[2]+") is possibly wrong, expected in hex value, eg: #ABC123 or #222FFF. Type '!speshal color help' for more.`");
            return;
        }
        // Checks if that user has a role already for himself.
        let userName = message.author.id;
        if(message.guild.roles.cache.find(role => role.name === userName) != undefined){
            // If the user does have a role already, sets the new color.
            message.channel.send("`Changing " + message.author.username + "'s color to " + args[2] + "`");
            message.guild.roles.cache.find(role => role.name === userName).setColor(args[2]).catch(console.error);
            message.member.roles.add(userName);
            return;
        }else{
            // If the user doesn't have a role yet, creates a role with his id as role name.
            message.channel.send('`Setting ' + message.author.username + "'s color to " + args[2] + "`");
            console.log(message.guild.roles.highest.position);
            message.guild.roles.create({
                data: {
                name: message.author.id,
                color: parseInt(args[2].replace("#","0x"),16),
                position: message.guild.roles.highest.position-4,
                },
                reason: 'Someone requested this',
            })
                .then(newRole => message.member.roles.add(newRole)) // Adds the user to the role.
                .catch(console.error);
    }},
};