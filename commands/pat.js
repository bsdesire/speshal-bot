const Discord = require('discord.js');
const Canvas = require('canvas');
const fs = require('fs');
const CanvasGifEncoder = require('canvas-gif-encoder');
const { Readable } = require('stream');

module.exports = {
	name: 'pat',
	description: 'Speshal Pat!',
	async execute(message, args) {
        if(args[2]!=undefined ){
            const canvas = Canvas.createCanvas(199, 130);
            const ctx = canvas.getContext('2d');
            const encoder = new CanvasGifEncoder(199, 130);


            let stream = fs.createWriteStream('output'+message.author.id+'.gif');
            encoder.createReadStream().pipe(stream);

            Readable.prototype._read = function() { // Solving _read is not implemented.
                this._paused = false;
              }

            encoder.begin();
            ctx.lineWidth = 3;
            ctx.strokeStyle = "white";

            const avatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'png' }));

            if(message.mentions.users.first()!=undefined){
                const avatar2 = await Canvas.loadImage((message.mentions.users.first()).displayAvatarURL({ format: 'png' }));

                for (let i = 0; i < 2; ++i) {
                    const patgif = await Canvas.loadImage('./images/pat/frame_'+i+'.gif');
                    ctx.drawImage(patgif, 0, 0, patgif.width, patgif.height);
                    ctx.drawImage(avatar, 47, 24, 56, 56);
                    ctx.drawImage(avatar2, 132, 29, 56, 56);
                    encoder.addFrame(ctx, 4);
                }

                encoder.end();
                const attachment = new Discord.MessageAttachment('output'+message.author.id+'.gif');

                message.channel.send(attachment);

                setTimeout(function () {
                fs.unlink('output'+message.author.id+'.gif',function (err) {
                    if (err) throw err;
                    // if no error, file has been deleted successfully
                });
            }, 5000);
            }else{
                message.react('❌');
                message.channel.send("`Did you type the command correctly? Type '!speshal help' for more info.`");
                return;
            }

                
    }else{
        message.react('❌');
        message.channel.send("`Did you type the command correctly? Type '!speshal help' for more info.`");
        return;
    }},
    
};