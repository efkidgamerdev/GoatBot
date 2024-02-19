module.exports = {
  config: {
    name: "goatActions",
    aliases: ["actions", "goat"],
    version: "1.0",
    author: "GoatAI by Liane",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "GoatAI - Perform actions with the goat",
      tl: "GoatAI - Isagawa ang mga kilos ng kambing"
    },
    longDescription: {
      en: "GoatAI - Perform specific actions with the goat",
      tl: "GoatAI - Isagawa ang mga espesyal na kilos ng kambing"
    },
    category: "goatBot",
    guide: {
      en: "{p}goatActions <action>",
      tl: "{p}goatActions <aksyon>"
    },
  },

  onChat: async function ({ event, message }) {
    const action = event.body.toLowerCase();

    switch (action) {
      case "walk":
        message.reply("Move the goat in the specified direction.");
        break;
      case "jump":
        message.reply("Make the goat jump over obstacles.");
        break;
      case "eat":
        message.reply("Allow the goat to eat grass or other objects in its path.");
        break;
      case "climb":
        message.reply("Help the goat climb mountains or trees.");
        break;
      case "headbutt":
        message.reply("Use the goat's strong head to knock down objects or enemies.");
        break;
      case "hide":
        message.reply("Command the goat to hide behind objects for stealth.");
        break;
      case "explore":
        message.reply("Allow the goat to roam freely and discover new locations.");
        break;
      case "swim":
        message.reply("Guide the goat through water bodies like rivers or lakes.");
        break;
      case "kick":
        message.reply("Enable the goat to kick objects or enemies in its way.");
        break;
      case "fly":
        message.reply("Grant the goat the ability to fly, either temporarily or permanently.");
        break;
      default:
        message.reply("Invalid action. Please choose a valid action from the list.");
        break;
    }
  },
};