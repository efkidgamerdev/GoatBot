const axios = require('axios');

module.exports = {
  config: {
    name: "removebg",
    aliases: ["rbg"],
    version: "1.0",
    author: "Rishad",
    countDown: 20,
    role: 0,
    shortDescription: {
      en: "Remove background from an image"
    },
    longDescription: {
      en: "Remove background from an image"
    },
    category: "AI",
    guide: {
      en: "{pn} reply to image"
    }
  },

  onStart: async function ({ api, event }) {
    const imageLink = event.messageReply?.attachments[0]?.url;
    if (!imageLink) {
      return api.sendMessage('Please reply to an image.', event.threadID, event.messageID);
    }

    try {
      const apiUrl = `https://for-devs.rishadapis.repl.co/api/rbg?imageUrl=${encodeURIComponent(imageLink)}&apikey=fuck`;
      const imageStream = await global.utils.getStreamFromURL(apiUrl);
      if (!imageStream) {
        return api.sendMessage('Failed to generate art from the image.', event.threadID, event.messageID);
      }
      return api.sendMessage({ attachment: imageStream }, event.threadID, event.messageID);
    } catch (error) {
      console.error(error); // Log the error for debugging
      return api.sendMessage(`Failed to Remove background from image. Error: ${error.message}`, event.threadID, event.messageID);
    }
  }
};