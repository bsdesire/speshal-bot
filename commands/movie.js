const { empty } = require('cheerio/lib/api/manipulation');
const Discord = require('discord.js');
const TorrentSearchApi = require('torrent-search-api');

TorrentSearchApi.enablePublicProviders();
//TorrentSearchApi.disableProvider('TorrentLeech');
//TorrentSearchApi.disableProvider('Torrent9');
//TorrentSearchApi.disableProvider('Limetorrents');




module.exports = {
    name: 'movie',
    description: 'Speshal torrent search movies!',
    async execute(message, prefix, args, disbut) {
        if (args[2] != undefined) {
            if (args[2].toLowerCase() === "help") {
                const exampleEmbed = new Discord.MessageEmbed()
                    .setColor("#54913B")
                    .addFields({
                        name: "Search for a movie torrent!",
                        value:
                            "Type: ` " + prefix + " movie Name of Movie",
                    })
                    .setFooter("Speshal Bot - 2020", "https://i.imgur.com/s7CCC6v.png");
                message.channel.send(exampleEmbed);
                return;
            }

            console.log(TorrentSearchApi.getActiveProviders());

            searchtxt = args.join(" ").replace('movie', '').trim();
            console.log(searchtxt)
            const torrents = await TorrentSearchApi.search(searchtxt, 5);


            const movieName = [], url = [], size = [], seeds = [], provider = [];
            torrents.forEach(function (result) {
                movieName.push(result.title)
                url.push(result.desc)
                size.push(result.size)
                seeds.push(result.seeds)
                provider.push(result.provider)
            })

            const resultsEmbed = new Discord.MessageEmbed()
                .setColor("#000000")
                .setTitle('Movies - Torrent Search')
                .setThumbnail('https://i.imgur.com/h4WFKTb.png')
                .setDescription('You searched for: ' + searchtxt)
                .setTimestamp()
            if (movieName > 0) {
                for (let i = 0; i < movieName.length; i++) {
                    resultsEmbed.addField(i + '. ' + movieName[i] + '\n🟢 Seeds: ' + seeds[i] + '\n🎞 Provider: ' + provider[i] + '\n', '', false)
                }
            }else{
                resultsEmbed.addField('No results have been found. Try another name?')
            }
            message.channel.send(resultsEmbed);

            return;
        }
    },
};



/* const exampleEmbed = new Discord.MessageEmbed()
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
            client.channels.cache.get('806319489754726422').send(exampleEmbed, button); */