const axios = require('axios');
const moment = require('moment-timezone');

const Prefixes = [
  'blackbox',
  'ask',
  'gpt',
];
const API_URL = "https://useblackbox.io/chat-request-v4";
const API_KEY = "oMAoQOWiawBexKnW";

module.exports = {
  config: {
    name: 'aiv3',
    version: '2.5',
    author: 'jay',
    role: 0,
    category: 'ai',
    shortDescription: {
      en: 'Asks an AI for an answer.',
    },
    longDescription: {
      en: 'Asks an AI for an answer based on the user prompt.',
    },
    guide: {
      en: '{pn} [prompt]',
    },
  },
  onStart: async function () {},
  onChat: async function ({ api, event, args, message }) {
    try {
      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));

      if (!prefix) {
        return;
      }

      const prompt = event.body.substring(prefix.length).trim();

      if (prompt === '') {
        await message.reply(
          "Kindly provide a question or query."
        );
        return;
      }

      await message.reply("🕣 | Answering.......");

      const gptAnswer = await getGPTAnswer(prompt);
      message.reply(gptAnswer);
    } catch (error) {
      console.error(error);
      message.reply("Error while fetching the GPT response.");
    }
  },
};

async function getGPTAnswer(question) {
  const { data } = await axios.get(API_URL, {
    params: {
      query: encodeURIComponent(question),
      apikey: API_KEY,
    },
  });

  const gptAnswer = data.chatGPT;
const philippinesTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Manila" });
return `𝗚𝗣𝗧-3 𝗕𝗶𝗹𝗹𝘀 𝗔𝗶👾:                  ${gptAnswer}  


𝗗𝗲𝘃 𝗟𝗶𝗻𝗸: https://www.facebook.com/profile.php?id=61550037082227
𝗣𝗵𝗶𝗹𝗶𝗽𝗽𝗶𝗻𝗲𝘀 𝘁𝗶𝗺𝗲𝘇𝗼𝗻𝗲: ${philippinesTime}`;
}