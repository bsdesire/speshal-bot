const Discord = require('discord.js');
const Canvas = require('canvas');
module.exports = {
	name: 'kith',
	description: 'Speshal Kith!',
	async execute(message, args) {
        if(args[2]!=undefined ){
            const canvas = Canvas.createCanvas(700, 145);
            const ctx = canvas.getContext('2d');

            // Since the image takes time to load, you should await it
            const background = await Canvas.loadImage('./images/kithbg.jpg');
            const lips = await Canvas.loadImage('./images/kiss.png');
            // This uses the canvas dimensions to stretch the image onto the entire canvas
            ctx.drawImage(background, 0, 0, background.width, background.height);
             
            // Select the font size and type from one of the natively available fonts
            //ctx.font = '40px Comic Sans MS';
            // Select the style that will be used to fill the text in
            //ctx.fillStyle = '#FFFFFF';
            // Actually fill the text with a solid color
            //ctx.fillText("SPESHAL KISSES", 186, 140);


            // Wait for Canvas to load the image
            const avatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'png' }));
            if(message.mentions.users.first()!=undefined){
                const avatar2 = await Canvas.loadImage((message.mentions.users.first()).displayAvatarURL({ format: 'png' }));
                ctx.drawImage(avatar2, 550, 10, 140, 140);
            }else{
                ctx.drawImage(avatar, 550, 10, 140, 140);
            }
            // Draw a shape onto the main canvas
            ctx.drawImage(avatar, 5, 10, 140, 140);
            
            ctx.drawImage(lips, 80, 55, 90, 62);
            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'speshalkith.png');

            message.channel.send(attachment);
                
    }else{
        message.channel.send("`Did you type the command correctly? Type '!speshal kith help' for more info.`");
        return;
    }},
    
    async executeAnyways(message) {
        const canvas = Canvas.createCanvas(700, 145);
            const ctx = canvas.getContext('2d');

            // Since the image takes time to load, you should await it
            const background = await Canvas.loadImage('./images/kithbg.jpg');
            const lips = await Canvas.loadImage('./images/kiss.png');
            // This uses the canvas dimensions to stretch the image onto the entire canvas
            ctx.drawImage(background, 0, 0, background.width, background.height);
             
            // Select the font size and type from one of the natively available fonts
            //ctx.font = '40px Comic Sans MS';
            // Select the style that will be used to fill the text in
            //ctx.fillStyle = '#FFFFFF';
            // Actually fill the text with a solid color
            //ctx.fillText("SPESHAL KISSES", 186, 140);


            // Wait for Canvas to load the image
            const avatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'png' }));
            if(message.mentions.users.first()!=undefined){
                const avatar2 = await Canvas.loadImage((message.mentions.users.first()).displayAvatarURL({ format: 'png' }));
                ctx.drawImage(avatar2, 550, 10, 140, 140);
            }else{
                ctx.drawImage(avatar, 550, 10, 140, 140);
            }
            // Draw a shape onto the main canvas
            ctx.drawImage(avatar, 5, 10, 140, 140);
            
            ctx.drawImage(lips, 80, 55, 90, 62);
            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'speshalkith.png');

            message.channel.send(attachment);
    },
};