const axios = require('axios');

const Prefixes = [
  'funfact',
];

module.exports = {
  config: {
    name: "funfact",
    aliases: ["funfact"],
    version: "1.0",
    author: "Jay",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "GoatAI - Get a random fun fact",
      tl: "GoatAI - Kunin ang isang random na fun fact"
    },
    longDescription: {
      en: "GoatAI - Get a random fun fact",
      tl: "GoatAI - Kunin ang isang random na fun fact"
    },
    category: "goatBot",
    guide: {
      en: "{p}funfact",
      tl: "{p}funfact"
    },
  },

  async onStart({ message, api }) {
    // List of random fun facts
    const funFacts = [
      "Did you know that a snail can sleep for three years?",
      "The average person will spend six months of their life waiting for red lights to turn green.",
      "Strawberries aren't technically berries, but bananas are.",
      "A single cloud can weigh more than one million pounds.",
      "Polar bears have black skin.",
      "On average, it takes about 10 minutes for a person to fall asleep.",
      "The world's oldest known recipe is for beer.",
      "The pet rabbit named Thumper in Bambi (1942) is actually a girl.",
    ];

    // Get a random fun fact from the list
    const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];

    // Reply with the random fun fact
    message.reply(`𝗛𝗲𝗿𝗲'𝘀 𝗮 𝗿𝗮𝗻𝗱𝗼𝗺 𝗳𝘂𝗻𝗳𝗮𝗰𝘁: ${randomFact}`);
  },
};