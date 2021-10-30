var request = require('request')
    , cheerio = require('cheerio')
const Discord = require("discord.js");

module.exports = {
    name: 'cracks',
    description: 'Speshal Cracks!',
    execute(lastCrack, client) {
        function checkForNewGame() {
            var url = 'https://predb.org/cats/GAMES';
            var lastGameName = lastCrack.get('lastCrack');
            //console.log(lastCrack.get('lastCrack'));
            request(url, function (err, response, body) {
                if (err) throw console.log(err);
                var $ = cheerio.load(body);
                var gameName = $('tbody > tr').first().find('a').text().replace(/-.*$/, ' ');
                var groupName = $('tbody > tr > td:nth-child(3) > a').html();
                var timeAgo = $('tbody > tr > th:last-child').html();
                
                let allGuilds = client.guilds.cache;

                if (gameName != lastGameName) {
                    lastCrack.set('lastCrack', gameName)
                    allGuilds.forEach(function (guild) {
                        var channel = client.settings.get(guild.id, 'crackChan');
                        if (channel != undefined) {
                            const message = new Discord.MessageEmbed()
                                .setColor("#000000")
                                .setTitle('New Crack!')
                                .setThumbnail('https://i.imgur.com/h4WFKTb.png')
                                .setDescription(gameName)
                                .addField('Cracked by: ' + groupName, 'Time ago: ' + timeAgo, false)
                                .setTimestamp()
                            client.channels.cache.get(channel.toString().replace('<','').replace('>','').replace('#','')).send(message);
                        }
                    })
                }
            });
            ;
        }
        checkForNewGame();
        setInterval(checkForNewGame, 60000)
    }
};



// CrackWatch

/*
if ($(this).find('span').attr('title') == 'Release') {
                    console.log($(this).text().replace('Release', '').replace('(self.CrackWatch)', ''));
                }
                */


// Get all on 1st page

/*
$('tbody > tr').each(function () {
                console.log($(this).find('a').text().replace('-',' '))
                //console.log('%s (%s)', $(this).text(), $(this).attr('href'));
            });
*/