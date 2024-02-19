// Import the necessary modules
const { getRandomElement } = global.utils;

module.exports = {
  config: {
    name: "fortune",
    version: "1.0",
    author: "LiANE", //do not change
    role: 0,
    category: "fun",
    guide: {
      en: "{prefix}fortune <question> - Ask the virtual fortune teller a question.",
    },
  },

  onStart: async function ({ api, args, message, event, threadsData, usersData, getLang }) {
    const question = args.join(" ");

    if (!question) {
      return message.reply("Please ask a question to the virtual fortune teller.");
    }

    // Define an array of entertaining fortune teller responses
    const fortuneResponses = [
      "🔮 The mystical crystal ball says: It is certain.",
      "🔮 The ancient spirits whisper: Reply hazy, try again.",
      "🔮 The stars align and reveal: Without a doubt.",
      "🔮 The fortune teller chuckles: Don't count on it.",
      "🔮 The magic 8-ball says: Signs point to yes!",
      "🔮 The crystal ball shimmers: Very doubtful.",
    ];

    // Get a random response from the array
    const randomResponse = getRandomElement(fortuneResponses);

    // Send the entertaining response to the user
    message.reply(`🔮 Virtual Fortune Teller 🔮\n\nYou asked: ${question}\n\n${randomResponse}`);
  },
};
