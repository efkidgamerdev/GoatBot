const axios = require('axios');

module.exports = {
  config: {
    name: "GrabFav",
    version: "1.0.0",
    role: 0,
    shortDescription: {
      en: "Grab Favicon for a domain",
      tl: "Kuha ng Favicon para sa isang domain"
    },
    longDescription: {
      en: "Grab Favicon for a domain",
      tl: "Kuha ng Favicon para sa isang domain"
    },
    category: "Developer Tools",
    guide: {
      en: "{p}GrabFav <domain>",
      tl: "{p}GrabFav <domain>"
    }
  },

  onStart: async function ({ event, message, args }) {
    const domain = args[0];

    if (!domain) {
      message.reply("Please provide a domain.");
      return;
    }

    try {
      const response = await axios.get(`https://apihunt-favicon-grabber.augustquinn.repl.co/Grab/=${domain}`);
      const faviconUrl = response.data.icons.find(icon => icon.size === "32x32").src;

      message.reply(`Favicon for ${domain}: ${faviconUrl}`);
    } catch (error) {
      message.reply("Failed to grab favicon.");
      console.error(error);
    }
  }
}; 