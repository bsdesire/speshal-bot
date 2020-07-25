const Discord = require('discord.js');
const Canvas = require('canvas');
module.exports = {
	name: 'kith',
	description: 'Speshal Kith!',
	async execute(message, prefix, args) {
        if(args[2]!=undefined ){
            const canvas = Canvas.createCanvas(700, 145);
            const ctx = canvas.getContext('2d');

            // Since the image takes time to load, you should await it
            const background = await Canvas.loadImage('./images/kithbg.jpg');
            const lips = await Canvas.loadImage('./images/kiss.png');
            // This uses the canvas dimensions to stretch the image onto the entire canvas
            ctx.globalAlpha = 0.2;
            ctx.drawImage(background, 0, 0, background.width, background.height);
            ctx.globalAlpha = 1;
            // Select the font size and type from one of the natively available fonts
            //ctx.font = '40px Comic Sans MS';
            // Select the style that will be used to fill the text in
            //ctx.fillStyle = '#FFFFFF';
            // Actually fill the text with a solid color
            //ctx.fillText("SPESHAL KISSES", 186, 140);
            ctx.lineWidth = 3;
            ctx.strokeStyle = "white";

            // Wait for Canvas to load the image
            const avatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'png' }));
            ctx.save();
                // Pick up the pen
               ctx.beginPath();
               // Start the arc to form a circle
               ctx.arc(616, 77, 66, 0, Math.PI * 2, true);
               // Put the pen down
               ctx.closePath();
               
               ctx.stroke();
               // Clip off the region you drew on
               ctx.clip();
            if(message.mentions.users.first()!=undefined){
                const avatar2 = await Canvas.loadImage((message.mentions.users.first()).displayAvatarURL({ format: 'png' }));
                ctx.drawImage(avatar2, 550, 10, 140, 140);
            }else{
                ctx.drawImage(avatar, 550, 10, 140, 140);
            }
            ctx.restore();
            ctx.save();
            // Pick up the pen
            ctx.beginPath();
            // Start the arc to form a circle
            ctx.arc(77, 77, 66, 0, Math.PI * 2, true);
            // Put the pen down
            ctx.closePath();
            ctx.stroke();
            // Clip off the region you drew on
            ctx.clip();
            // Draw a shape onto the main canvas
            ctx.drawImage(avatar, 5, 10, 140, 140);

            ctx.restore();
            
            // Draw lips
            ctx.drawImage(lips, 100, 55, 90, 62);
            ctx.drawImage(lips, 300, 25, 120, 83);
            ctx.drawImage(lips, 515, 55, 90, 62);
            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'speshalkith.png');

            message.channel.send(attachment);
                
    }else{
        message.react('❌');
        message.channel.send("`Did you type the command correctly? Type '"+prefix+" help' for more info.`");
        return;
    }},
    
};