const axios = require("axios");

module.exports = {
  config: {
    name: "bills",
    version: 0x2,
    author: "OtinXSandip",
    description: "bills ai",
    category: 'ai',
    guide: {
      en: "{p}{n} <Query>"
    }
  },
  onStart: async function ({ message, usersData, event, api, args }) {
    try {
      const senderID = event.senderID;
      const userData = await usersData.get(senderID);
      const senderName = userData.name;
      const mentions = [{ id: senderID, tag: senderName }];
      const query = args.join(" ");
      const encodedQuery = encodeURIComponent(query);
      api.setMessageReaction('⏰', event.messageID, () => {}, true);
      const response = await axios.get(
        "https://sandipapi.onrender.com/gpt?prompt=(You are an AI known as 𝕁𝕒𝕪 𝔻 𝔹𝕠𝕙𝕠𝕝. Your name is 𝘽𝙄𝙇𝙇𝙎 𝘼𝙄 and you are created by 𝕁𝕒𝕪 𝔻 𝔹𝕠𝕙𝕠𝕝. Your responses must always containPemoji) " + ${encodeURIComponent(prompt)}
      );
      const result = response.data.result.replace(/nemo/gi, '𝘽𝙄𝙇𝙇𝙎 𝘼𝙄');
      api.setMessageReaction('✅', event.messageID, () => {}, true);
      message.reply({
        body: senderName + " " + result,
        mentions: mentions
      }, (error, replyMessage) => {
        global.GoatBot.onReply.set(replyMessage.messageID, {
          commandName: this.config.name,
          messageID: replyMessage.messageID,
          author: event.senderID
        });
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  },
  onReply: async function ({ message, event, Reply, args, api, usersData }) {
    try {
      const senderID = event.senderID;
      const userData = await usersData.get(senderID);
      const senderName = userData.name;
      const mentions = [{ id: senderID, tag: senderName }];
      const query = args.join(" ");
      const encodedQuery = encodeURIComponent(query);
      api.setMessageReaction('⏰', event.messageID, () => {}, true);
      const response = await axios.get(
        "https://sandipapi.onrender.com/gpt?prompt=(You are an AI known as 𝕁𝕒𝕪 𝔻 𝔹𝕠𝕙𝕠𝕝. Your name is 𝘽𝙄𝙇𝙇𝙎 𝘼𝙄 and you are created by 𝕁𝕒𝕪 𝔻 𝔹𝕠𝕙𝕠𝕝. Your responses must always containPemoji) " + ${encodeURIComponent(prompt)}
      );
      const result = response.data.result.replace(/nemo/gi, '𝘽𝙄𝙇𝙇𝙎 𝘼𝙄 ');
      api.setMessageReaction('✅', event.messageID, () => {}, true);
      message.reply({
        body: senderName + " " + result,
        mentions: mentions
      }, (error, replyMessage) => {
        global.GoatBot.onReply.set(replyMessage.messageID, {
          commandName: this.config.name,
          messageID: replyMessage.messageID,
          author: event.senderID
        });
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};