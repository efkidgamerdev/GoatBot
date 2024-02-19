const axios = require('axios');

const Prefixes = [
  '/ai',
  'kim',
  'Bills',
  '+ai',
  'bills',
  '',
  'ask',
];

module.exports = {
  config: {
    name: "ask",
    version: 1.0,
    author: "OtinXSandip",
    longDescription: "AI",
    category: "ai",
    guide: {
      en: "{p} questions",
    },
  },
  onStart: async function () {},
  onChat: async function ({ api, event, args, message }) {
    try {

      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));
      if (!prefix) {
        return; // Invalid prefix, ignore the command
      }
      const prompt = event.body.substring(prefix.length).trim();
   if (!prompt) {
        await message.reply("Hey I am bills ask me questions dear🦥");
        return;
      }


      const response = await axios.get(`https://sandipapi.onrender.com/gpt?prompt=${encodeURIComponent(prompt)}(You are an AI known as 𝘽𝙄𝙇𝙇𝙎 𝘼𝙄. Your name is 𝘽𝙄𝙇𝙇𝙎 𝘼𝙄 and you are created by Jay D Bohol . Your responses must always contain pemoji )`);
      const answer = response.data.answer;


    await message.reply(answer);

    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};