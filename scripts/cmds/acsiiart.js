const figlet = require('figlet');

module.exports = {
  config: {
    name: "asciiart",
    aliases: ["art"],
    role: 0,
    category: "goatBot",
    shortDescription: {
      en: "Generate ASCII art from text",
      tl: "Mag-generate ng ASCII art mula sa teksto"
    },
    longDescription: {
      en: "Generate ASCII art from the given text using figlet module",
      tl: "Mag-generate ng ASCII art mula sa binigay na teksto gamit ang modulong figlet"
    },
    guide: {
      en: "{p}asciiart <text>",
      tl: "{p}asciiart <teksto>"
    }
  },

  onStart: async function ({ event, message, args }) {
    const text = args[0];
    if (!text) {
      message.reply("Please provide the text to generate ASCII art.");
      return;
    }

    figlet.text(text, async function (err, data) {
      if (err) {
        message.reply("Error generating ASCII art.");
        console.log(err);
        return;
      }

      message.reply(`\`\`\`${data}\`\`\``);
    });
  }
};