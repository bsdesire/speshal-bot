const Discord = require("discord.js");
var fs = require("fs");

//var isItRunning = true;
module.exports = {
  name: "nhie",
  description: "Never have I ever...",
  execute(message, lines, guild, prefix, args) {
    let nquestions = 0;
    console.log(guild);
    var listOfAnswered = [];
    // Check how many questions to play.
    if (args[2] == "stop") {
      console.log(guild);
      if (global.gameIsRunning[guild] == true) {
        global.gameIsRunning[guild] = false;
        clearInterval(timeout);
        showScoreboard(global.playersPlaying[guild], global.countDrinks[guild], message, guild);
        message.channel.send("Game was stopped by " + message.author.name);
        global.countDrinks[guild] = []; // Saves all the users ID's for when people drink.
        global.playersPlaying[guild] = [];
        return;
      }
    }
    if (global.gameIsRunning[guild] == true) {
      return;
    }
    if (args[2] == undefined) {
      nquestions = 10;
    } else if (
      isNumber(parseInt(args[2])) &&
      parseInt(args[2]) <= lines.length
    ) {
      nquestions = parseInt(args[2]);
    } else if (isNumber(parseInt(args[2]))) {
      nquestions = lines.length;
    } else {
      return;
    }
    // Sends the start message
    global.gameIsRunning[guild] = true;
    console.log(global.gameIsRunning[guild]);
    const gameStart = new Discord.MessageEmbed()
      .setColor("#FF0000")
      .setDescription(
        '- A game of "Never Have I Ever" is about to start! Get your drinks ready...'
      );
    message.channel.send({ embed: gameStart });

    // Mini rules and number of questions
    setTimeout(function () {
      const rules = new Discord.MessageEmbed()
        .setTitle("📝 Rules of 'Never Have I Ever'")
        .setColor("#FF0000")
        .setDescription(
          "- The game is simple, just react to the following questions accordingly to if you have performed said action or not. \n\n- This game will have " +
          nquestions +
          " questions! \n\n- Do not blackout, have fun! 🍸🥂🥃 \nStarting in 20s..."
        );
      message.channel.send({ embed: rules });
    }, 5000);

    // Sets the timeout of 20s for the first question, changes to 60.
    var delay = 20000;
    var i = 1;

    timeout = setTimeout(function newQuestion() {
      if (global.gameIsRunning[guild]) {
        let question = lines[Math.floor(Math.random() * lines.length)];
        while (listOfAnswered.includes(question)) {
          question = lines[Math.floor(Math.random() * lines.length)];
        }
        listOfAnswered.push(question);
        const sentenceEmbed = new Discord.MessageEmbed()
          .setTitle("❔ Question #" + i)
          .setColor("#FF0000")
          .setDescription("- Never have I ever " + question + ".");
        message.channel.send({ embed: sentenceEmbed }).then((sentenceEmbed) => {
          sentenceEmbed.react("👍").then(() => sentenceEmbed.react("👎"));

          const filter = (reaction, user) => {
            return (
              ["👍", "👎"].includes(reaction.emoji.name) &&
              user.id != sentenceEmbed.author.id
            );
          };

          let drinking = "";
          let notdrinking = "";
          let alreadyReacted = [];

          const collector = sentenceEmbed.createReactionCollector(filter, {
            time: 15000,
          });

          collector.on("collect", (reaction, user) => {
            console.log(`Collected ${reaction.emoji.name} from ${user.id}`);

            if (
              reaction.emoji.name === "👍" &&
              !alreadyReacted.includes(user.id)
            ) {
              drinking += "<@" + user.id + ">" + "\n";
              alreadyReacted.push(user.id);
              global.countDrinks[guild].push(user.id);
              if (!global.playersPlaying[guild].some(user => user.ID === user.id)) {
                // This is only executed if the user.id isn't in playersPlaying.
                global.playersPlaying[guild].push(user.id);
              }
            } else if (!alreadyReacted.includes(user.id)) {
              notdrinking += "<@" + user.id + ">" + "\n";
              alreadyReacted.push(user.id);
              if (!global.playersPlaying[guild].some(user => user.ID === user.id)) {
                // This is only executed if the user.id isn't in playersPlaying.
                global.playersPlaying[guild].push(user.id);
              }
            }
          });

          // Check who's drinking and who's not

          collector.on("end", (collected) => {
            console.log(`Collected ${collected.size} items`);
            const sentenceEmbed = new Discord.MessageEmbed()
              .setTitle("Results of Last Round!")
              .setColor("#FF0000")
              .setDescription(
                "🥤 People who are drinking this round:\n" +
                drinking +
                "\n\n⛔ People who are NOT drinking this round:\n" +
                notdrinking +
                "\n\n\n🔜 Get ready for another question!"
              );
            message.channel.send({ embed: sentenceEmbed });

          });

        });
      }
      // New question every minute.
      if (i == nquestions) {
        // Figuring out who drank more times and who drank less.
        setTimeout(function () {
          showScoreboard(global.playersPlaying[guild], global.countDrinks[guild], message);
          global.countDrinks[guild] = []; // Reset the counter.
          global.playersPlaying[guild] = [];
        }, 40000);
        return;
      }

      if (global.gameIsRunning[guild]) {
        // Increases question number.
        i++;
        setTimeout(newQuestion, 40000);
      }
    }, delay);

    return;
  },

  readLinesFromFile(file) {
    let lines = [];

    fs.readFileSync(file, "utf-8")
      .split(/\r?\n/)
      .forEach(function (line) {
        lines.push(line);
      });
    console.log(lines[2]);

    return lines;
  },
};

function isNumber(n) {
  return Number(n) === n;
}

function showScoreboard(playersPlaying, countDrinks, message, guild) {
  let leaderboard = [];

  playersPlaying.forEach(function (player) {
    leaderboard.push({ playerID: player, count: 0 });

    countDrinks.forEach(function (pDrink) {
      if (player == pDrink) {
        let countObj = leaderboard.find(
          (countObj) => countObj["playerID"] === player
        );
        countObj["count"]++;
      }
    });
  });

  function compare(a, b) {
    if (a["count"] > b["count"]) {
      return -1;
    }
    if (a["count"] < b["count"]) {
      return 1;
    }
    return 0;
  }

  leaderboard.sort(compare);

  let leaderboardString = "";
  let placement = 1;
  leaderboard.forEach(function (score) {
    leaderboardString +=
      "`#" +
      placement +
      ":` <@" +
      score["playerID"] +
      ">" +
      " - `" +
      score["count"] +
      "`\n";
    placement++;
  });
  const endGameEmbed = new Discord.MessageEmbed()
    .setTitle("✨ The End ✨")
    .setColor("#FF0000")
    .setDescription(
      "- We reached the end, thanks for playing! Keep yourself hidrated!\n\n`Drinking Scoreboard - End Game:`\n" +
      leaderboardString
    );
  message.channel.send({ embed: endGameEmbed });
  global.gameIsRunning[guild] = false; // Scoreboard means game is over.
}
