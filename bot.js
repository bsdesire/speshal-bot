const Discord = require('discord.js');
const fs = require('fs');
var auth = require('./auth.json')
const Enmap = require("enmap");
const client = new Discord.Client();

// NHIE STUFF
global.gameIsRunning = {};
global.countDrinks = {};
global.playersPlaying = {};


client.stats = new Enmap({name: "stats"}); // Stats Enmap - (just counting messages for now).

client.settings = new Enmap({name: "settings"}); // Setting setting per server.

client.commands = new Discord.Collection(); // Starts the command collection variable.

// Default Guild Settings :

const guildSettingsDefault = {
    prefix: "!speshal",
    logChan: "speshal-logs"
}




const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); // Gets all the commands from the command folder (*.js files).

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

let randomNHIE = client.commands.get('nhie').readLinesFromFile('./content/nhie.txt');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("!speshal help");

  var allGuilds = client.guilds.cache;
    allGuilds.forEach(function(guild){
      // NHIE
        global.gameIsRunning[guild.id] = false; 
        global.countDrinks[guild.id] = [];
        global.playersPlaying[guild.id] = [];
      // NHIE
    });
});


// Event for when the bot joins
client.on("guildCreate", guild => {
  client.settings.ensure(guild.id, guildSettingsDefault); // Making sure there's a default setting.
})

// When the bot leaves or is kicked, delete settings to prevent stale entries.
client.on("guildDelete", guild => {
  client.settings.delete(guild.id);
});




client.login(auth.token);


// Start



client.on("message", (message) => {


  const guildConf = client.settings.ensure(message.guild.id, guildSettingsDefault); // Ensures that the setting for that guild exist, else it'll create an entry with the default ones.
  prefix = client.settings.get(message.guild.id, "prefix"); // Gets the prefix for that guild (server).


  // Stats.
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

  if (!message.content.startsWith(prefix)) return;

    

	const args = message.content.slice(prefix.length).split(/\s+/);
  if(args[1]!=undefined){
    if (args[1].toLowerCase() === 'color') {
          client.commands.get('color').execute(message, prefix, args);
        }else if(args[1].toLowerCase() === 'help'){
          client.commands.get('help').execute(message, prefix, args);
        }else if(args[1].toLowerCase() === 'nhie'){
          client.commands.get('nhie').execute(message, randomNHIE, message.guild.id, prefix, args); // The entire array created at the start.
        }else if(args[1].toLowerCase() === 'kith' || args[1].toLowerCase() === 'kiss'){
          client.commands.get('kith').execute(message, prefix, args);
        }else if(args[1].toLowerCase() === 'pat'){
          client.commands.get('pat').execute(message, prefix, args);
        }else if(args[1].toLowerCase() === 'messages'){
          const key = `${message.guild.id}-${message.author.id}`;
          return message.channel.send(`You currently have ${client.stats.get(key, "messagesSent")} messages sent this week!`);
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
              embed.addField(`#${i}`, `<@${data.user}> - ${data.messagesSent} messages.`);
              i++;
            }
          
            return message.channel.send({embed});
          }else if(args[1].toLowerCase() === "clearmsgcount") {
            if (message.member.hasPermission("MANAGE_ROLES")) {
            const filtered = client.stats.filter( p => p.guild === message.guild.id ).array();      
            for(const data of filtered) {
              client.stats.set(message.guild.id+"-"+data.user, 0, "messagesSent");
            }
            message.channel.send("Messages cleared for all users.");
          }
          }else if(args[1].toLowerCase() === 'purge'){
            client.commands.get('purge').execute(message, prefix, args);
            
          }else if(args[1].toLowerCase() === 'poll'){
            client.commands.get('poll').execute(message, prefix, args);
            
            
            // Commands to set settings.
          }else if(args[1].toLowerCase() === 'set'){
            if (message.member.hasPermission("ADMINISTRATOR")) {
              // Checks for keyword 'help'.
              if (args[2] == "help") {
                const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#54913B')
                .setTitle('Speshal Bot')
                .setThumbnail('https://i.imgur.com/z6pRGtP.png')
                .addFields(
                  { name: 'Setting bot\'s configuration values:', value: 'eg: Type `'+prefix+' set prefix !something`' },
                  { name: 'Settings that can be changed:', value: 'prefix\nlogChan' },
                  { name: 'To check the actual configuration:', value: 'Type `'+prefix+' showconf`' },
                )
                .setTimestamp()
                .setFooter('Speshal Bot - 2020', 'https://i.imgur.com/s7CCC6v.png');
            message.channel.send(exampleEmbed);
            return;
              }

              if (args[2] == undefined || args[3] == undefined) {
                return; // Returns if nothing is defined after set command.
              } 
                const setting = args[2];
                const newSetting = args[3];

                // If the key doesn't exist on the config.
                if(!client.settings.has(message.guild.id, setting)) {
                  return message.reply("There is no such configuration to set.");
                }
        
                // Sets the new value for the requested config.
                client.settings.set(message.guild.id, newSetting, setting);
                return message.reply(`The new ${setting} has been set to ${newSetting}`);

              
            }else{
              message.react('❌');
              return message.reply("You have no permissions to do this.");
            }

            // Show the guild configuration for each guild.
          }else if(args[1].toLowerCase() === 'showconf'){
            if (message.member.hasPermission("ADMINISTRATOR")) {
            let configProps = Object.keys(guildConf).map(prop => {
              return `${prop}  :  ${guildConf[prop]}\n`;
            });
            message.channel.send(`The following are the server's current configuration:\`\`\`${configProps}\`\`\``);
            }else{
              message.react('❌');
              return message.reply("You have no permissions to do this.");
            }
          }
        else if(args[1].toLowerCase() === 'adminhelp'){
          if (message.member.hasPermission("ADMINISTRATOR")) {
            client.commands.get('adminhelp').execute(message, prefix, args);
          }
        }
           
    }else{
        message.react('❌');
        message.channel.send("`Did you type the command correctly? Type '"+prefix+" help' for more info.`");
      }
  }
);

