module.exports = {
  config: {
    name: "horseRace",
    aliases: ["race"],
    version: "1.0",
    author: "Jaymwu",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Horse Racing Game",
      tl: "Laro ng Horse Racing"
    },
    longDescription: {
      en: "Simulates a horse racing game.",
      tl: "Nagpapalabas ng laro ng horse racing."
    },
    category: "goatBot",
    guide: {
      en: "{p}horseRace",
      tl: "{p}horseRace"
    }
  },

  onStart: async function ({ event, message, args, threadsData, usersData, api }) {
    // Create an array of horses
    const horses = ["🐴 Horse 1", "🐴 Horse 2", "🐴 Horse 3", "🐴 Horse 4"];

    // Shuffle the array to randomize the horse order
    for (let i = horses.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [horses[i], horses[j]] = [horses[j], horses[i]];
    }

    // Display the horse race message
    message.reply(`The horse race begins!\n\n${horses.join("\n")}`);

    // Wait for a few seconds before determining the winner
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Determine the winner
    const winner = horses[Math.floor(Math.random() * horses.length)];

    // Display the winner message
    message.reply(`And the winner is... ${winner}! 🎉`);
  }
};