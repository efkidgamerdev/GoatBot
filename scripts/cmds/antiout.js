 const path = require('path');
const fs = require('fs');

// Load the config.json file
const configPath = path.join(__dirname, '../../config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

module.exports = {
  config: {
    name: "antiout",
    version: "1.0",
    author: "MAS",
    countDown: 5,
    role: 0,
    shortDescription: "Enable or disable antiout",
    longDescription: "",
    category: "boxchat",
    guide: "{pn} {{[on | off]}}",
    envConfig: {
      deltaNext: 5
    }
  },
  onStart: async function ({ message, event, threadsData, args }) {
    // Check if the user invoking the command is in the adminBot list
    const adminBotIds = config.adminBot;

    if (!adminBotIds.includes(event.senderID)) {
      return message.reply("You don't have permission to use this command.");
    }

    let antiout = await threadsData.get(event.threadID, "settings.antiout");
    if (antiout === undefined) {
      await threadsData.set(event.threadID, true, "settings.antiout");
      antiout = true;
    }
    if (!["on", "off"].includes(args[0])) {
      return message.reply("Please use 'on' or 'off' as an argument");
    }
    await threadsData.set(event.threadID, args[0] === "on", "settings.antiout");
    return message.reply(`Antiout has been ${args[0] === "on" ? "enabled" : "disabled"}.`);
  },
  onEvent: async function ({ api, event, threadsData }) {
    const antiout = await threadsData.get(event.threadID, "settings.antiout");

    if (antiout && event.logMessageType === "log:unsubscribe") {
      const userId = event.logMessageData.leftParticipantFbId;
      const threadInfo = await api.getThreadInfo(event.threadID);
      const userIndex = threadInfo.participantIDs.indexOf(userId);

      if (userIndex === -1) {
        const addUser = await api.addUserToGroup(userId, event.threadID);

        if (addUser) {
          console.log(`User ${userId} was added back to the chat.`);
          
          // Get the user's name or username from the API
          const user = await api.getUserInfo(userId);
          const userName = user[userId].name || user[userId].vanity;

          // Send the custom message mentioning the user
          await api.sendMessage(`@${userName} Trying to leave huh? Well You can't do that here 😎`, event.threadID);
        } else {
          console.log(`Failed to add user ${userId} back to the chat.`);
        }
      }
    }
  }
};
