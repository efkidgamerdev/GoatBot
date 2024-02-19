const axios = require('axios');

module.exports = {
  config: {
    name: "brainly",
    aliases: ["brainly"],
    version: "1.0",
    author: "JUNMAR",
    countDown: 5,
    role: 0,
    shortDescription: "Ask anything",
    longDescription: "Ask anything",
    category: "ai",
    guide: {
      en: "{pn} ask"
    },
  },

  onStart: async function ({ message, args, api, event }) {
    const { threadID, messageID, body } = event;
    const question = body.slice(8).trim();

    if (!question) {
      api.sendMessage("Please provide a question.", threadID, messageID);
      return;
    }

    try {
      api.sendMessage("🔬 𝗯𝗶𝗹𝗹𝘀 𝖠𝗌𝗌𝗂𝗌𝗍𝖺𝗇𝖼𝖾 \n\nSearching for an answer. Please wait...", threadID, messageID);
      const res = await axios.get(`https://testapi.heckerman06.repl.co/api/other/brainly?text=${encodeURIComponent(question)}`);
      const data = res.data;
      if (data.question && data.answer) {
        const response = `Brainly API:\Question: ${data.question}\\Answer: ${data.answer}`;
        api.sendMessage(response, threadID, messageID);
      } else {
        api.sendMessage("🔬 𝗯𝗶𝗹𝗹𝘀 𝖠𝗌𝗌𝗂𝗌𝗍𝖺𝗇𝖼𝖾 \n\nNo answer found for the given question.", threadID, messageID);
      }
    } catch (error) {
      console.error(error);
      api.sendMessage("🔬 𝗯𝗶𝗹𝘀 𝖠𝗂𝗌𝗍𝖺𝗇𝖼𝖾 \n\nError occurred while fetching data from the Brainly API.", threadID, messageID);
    }
  }
};