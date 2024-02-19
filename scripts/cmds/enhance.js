const axios = require('axios');
const fs = require('fs');

module.exports = {
  config: {
    name: "enhance",
    aliases: ["4k"],
    version: "1.1",
    author: "MILAN",
    countDown: 120,
    role: 0,
    shortDescription: {
      vi: "Nâng cao chất lượng hình ảnh.",
      en: "Enhance image quality."
    },
    longDescription: {
      vi: "Nâng cao chất lượng hình ảnh.",
      en: "Enhance image quality."
    },
    category: "image",
    guide: {
      vi: "{pn} [ trả lời hình ảnh ]",
      en: "{pn} [ reply to image ]"
    }
  },

  onStart: async function ({ event, api, args, message }) {
try {
      const link = event.messageReply.attachments[0].url || args.join(" ");
      if (!link) return message.reply('🔬 Bills 𝖠𝗌𝗌𝗂𝗌𝗍𝖺𝗇𝖼𝖾 \n\nPlease reply to an image.');
      const res = await axios.get(`https://milanbhandari.imageapi.repl.co/imgur?link=${encodeURIComponent(link)}`); 
      const imageLink = res.data.image;
      const imageUrl = `https://milanbhandari.imageapi.repl.co/enhance?imageUrl=${res.data.image}`;
      const imageStream = await global.utils.getStreamFromURL(imageUrl);
      return message.reply({
        attachment: imageStream
      });
    } catch (error) {
      console.error("error while processing image:", error);
      return api.sendMessage('🔬 Bills 𝖠𝗌𝗌𝗂𝗌𝗍𝖺𝗇𝖼𝖾 \n\nError while processing image, Try replying to image itself.', event.threadID, event.messageID);
    }
  }
};