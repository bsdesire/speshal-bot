const Discord = require('discord.js');
const fs = require('fs');
var auth = require('./auth.json')
const Enmap = require("enmap");
const client = new Discord.Client();

// NHIE STUFF
global.gameIsRunning = {};
global.countDrinks = {};
global.playersPlaying = {};


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

client.on('message', msg => {
  if (msg.content.toLowerCase().includes("!oop")) {
    console.log(global.countDrinks);
    console.log(global.playersPlaying);
    console.log(global.gameIsRunning);
  }
});

client.login(auth.token);


// Start

prefix = "!speshal";

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
    }else{
        message.react('❌');
        message.channel.send("`Did you type the command correctly? Type '!speshal help' for more info.`");
      }
  }
});

