const axios = require('axios');
const gtts = require('gtts');
const path = require('path');
const fs = require('fs');
const moment = require('moment-timezone');

const Prefixes = [
  'ai',
  'Ai',
  'gpt',
];

module.exports = {
  config: {
    name: 'ai',
    version: '3.5',
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

      await message.reply("🕣 | 𝘈𝘯𝘴𝘸𝘦𝘳𝘪𝘯𝘨.......");

      const response = await axios.get(`https://api.easy-api.online/v1/globalgpt?q=${encodeURIComponent(prompt)}`);

      if (response.status !== 200 || !response.data) {
        throw new Error('Invalid or missing response from API');
      }

      const messageText = response.data.content.trim();

      const philippinesTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Manila" });

      message.reply({
        body: `𝗚𝗹𝗼𝗯𝗮𝗹𝗚𝗽𝘁 3.5 👾:
         𝗕𝗜𝗟𝗟𝗦 𝗔𝗜 🤖: ${messageText}\n\n𝗗𝗲𝘃 𝗟𝗶𝗻𝗸: https://www.facebook.com/profile.php?id=61550037082227\n\n𝗣𝗵𝗶𝗹𝗶𝗽𝗽𝗶𝗻𝗲𝘀 𝗧𝗶𝗺𝗲𝘇𝗼𝗻𝗲: ${philippinesTime}\n\n`,
      });

      console.log('Sent answer as a reply to user');

    } catch (error) {
      console.error(`Failed to get answer: ${error.message}`);
      api.sendMessage(
        `${error.message}.\\You can try typing your question again or resending it, as there might be a bug from the server that's causing the problem. It might resolve the issue.`,
        event.threadID
      );
    }
  },
};