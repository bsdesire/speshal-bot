const Discord = require('discord.js');
const fs = require('fs');
var auth = require('./auth.json')
const Enmap = require("enmap");
const client = new Discord.Client();

// NHIE STUFF
global.gameIsRunning = {};
global.countDrinks = {};
global.playersPlaying = {};


client.stats = new Enmap({name: "stats"});

client.commands = new Discord.Collection();


const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

let randomNHIE = client.commands.get('nhie').readLinesFromFile('./content/nhie.txt');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("Type !speshal help");

  var allGuilds = client.guilds.cache;
    //initialize all prefixes to a default prefix
    allGuilds.forEach(function(guild){
      // NHIE
      //console.log(guild);
        global.gameIsRunning[guild.id] = false; 
        global.countDrinks[guild.id] = [];
        
        global.playersPlaying[guild.id] = [];
        
      // NHIE
    });
});


prefix = "!speshal";

client.on('message', message => {
  if (message.author.bot) return;
  if (message.guild) {
    const key = `${message.guild.id}-${message.author.id}`;
    client.stats.ensure(`${message.guild.id}-${message.author.id}`, {
      user: message.author.id,
      guild: message.guild.id,
      messagesSent: 0
    });
    client.stats.math(key, "+", 1, "messagesSent");
  }
});

client.login(auth.token);


// Start



client.on("message", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    

	const args = message.content.slice(prefix.length).split(/\s+/);
  if(args[1]!=undefined){
    if (args[1].toLowerCase() === 'color') {
          client.commands.get('color').execute(message, args);
        }else if(args[1].toLowerCase() === 'help'){
          client.commands.get('help').execute(message, args);
        }else if(args[1].toLowerCase() === 'nhie'){
          client.commands.get('nhie').execute(message, randomNHIE, message.guild.id, args); // The entire array created at the start.
        }else if(args[1].toLowerCase() === 'kith' || args[1].toLowerCase() === 'kiss'){
          client.commands.get('kith').execute(message, args);
        }else if(args[1].toLowerCase() === 'pat'){
          client.commands.get('pat').execute(message, args);
        }else if(args[1].toLowerCase() === 'messages'){
          const key = `${message.guild.id}-${message.author.id}`;
          return message.channel.send(`You currently have ${client.stats.get(key, "messagesSent")} messages sent (since 20th July)!`);
        }else if(args[1].toLowerCase() === "top10") {
            const filtered = client.stats.filter( p => p.guild === message.guild.id ).array();
            const sorted = filtered.sort((a, b) => b.messagesSent - a.messagesSent);
            const top10 = sorted.splice(0, 10);
            const embed = new Discord.MessageEmbed()
              .setTitle("Spammers of the Week")
              .setAuthor(client.user.username, client.user.avatarURL)
              .setDescription("Top 10 spammers this week...")
              .setColor(0x00AE86);
              let i = 1;
            for(const data of top10) {
              embed.addField(`#${i}`, `${client.users.cache.get(data.user).tag} - ${data.messagesSent} messages.`);
              i++;
            }
            return message.channel.send({embed});
          }else if(args[1].toLowerCase() === 'purge'){
            client.commands.get('purge').execute(message, args);
            
        }else if(args[1].toLowerCase() === 'poll'){
          client.commands.get('poll').execute(message, args);
        }      
    }else{
        message.react('❌');
        message.channel.send("`Did you type the command correctly? Type '!speshal help' for more info.`");
      }
  }
);

