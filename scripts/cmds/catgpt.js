const axios = require("axios");
const fs = require("fs");

const vipFilePath = "vip.json";

function loadVIPData() {
  // Function to load VIP data from vip.json
  try {
    const data = fs.readFileSync(vipFilePath);
    return JSON.parse(data);
  } catch (err) {
    console.error("Error loading VIP data:", err);
    return {};
  }
}

module.exports = {
  config: {
    name: "catgpt",
    aliases: ["Minn2"],
    version: "1.0",
    author: "jay",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: ""
    },
    longDescription: {
      en: ""
    },
    category: "ai chat",
    guide: {
      en: ""
    }
  },
  langs: {
    en: {
      gg: ""
    }
  },

  onStart: async function({ api, event, args, message }) {
    try {
      const vipData = loadVIPData(); // Load VIP data from vip.json
      const blockedCommands = ["catgpt"]; // List of commands that require VIP access

      if (blockedCommands.includes(this.config.name)) {
        // Check if the user's UID is in the VIP list
        if (!vipData[event.senderID]) {
          message.reply("👑 VIP Users 👑\n⛔ Error! You are not VIP.");
          return; // Exit the function to prevent the command from executing
        }
      }

      const msg = args.join(" ");

      const response = await axios.post("https://catgpt.guru/api/chat", {
        messages: [
          {
            role: "user",
            content: msg
          }
        ]
      });

      console.log(response.data);

      api.sendMessage(response.data, event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
    }
  }
};
