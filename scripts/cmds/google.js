const axios = require('axios');

module.exports = {
  config: {
    name: "google",
    aliases: ["search", "g"],
    version: "2.0",
    author: "Jay senpai",
    role: 0,
    shortDescription: {
      en: "Searches Google for a given query."
    },
    longDescription: {
      en: "This command searches Google for a given query and returns the top 5 results."
    },
    category: "utility",
    guide: {
      en: "To use this command, type !google <query>."
    }
  },
  onStart: async function ({ api, event, args }) {
    const query = args.join(' ');
    if (!query) {
      api.sendMessage("Please provide a search query.", event.threadID);
      return;
    }

    const cx = "7514b16a62add47ae";
    const apiKey = "AIzaSyAqBaaYWktE14aDwDE8prVIbCH88zni12E";
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${query}`;
    try {
      const response = await axios.get(url);
      const searchResults = response.data.items.slice(0, 5);
      let message = `𝗚𝗢𝗢𝗚𝗟𝗘 𝗧𝗢𝗣 5 𝗥𝗘𝗦𝗨𝗟𝗧𝗦 𝗙𝗢𝗥 '${query}':\n`;
      searchResults.forEach((result, index) => {
        message += `\n${index + 1}. ${result.title}\n${result.link}`;
      });

      // Format current date and time
      const currentDateTime = new Date();
const formattedDateTime = currentDateTime.toLocaleString('en-PH', {
    timeZone: 'Asia/Manila',
    hour12: true
});

      // Adding the developer's Facebook profile link and current date and time
      const developerFacebookLink = "https://www.facebook.com/profile.php?id=61550037082227";
      message += `\n\n𝗗𝗲𝘃 𝗟𝗶𝗻𝗸: ${developerFacebookLink}`;
      message += `\n\n𝗖𝘂𝗿𝗿𝗲𝗻𝘁 𝗧𝗶𝗺𝗲: ${formattedDateTime}`;  // Appending current time to the message

      api.sendMessage(message, event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred while searching Google.", event.threadID);
    }
  }
};