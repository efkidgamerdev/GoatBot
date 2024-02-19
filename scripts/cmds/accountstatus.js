module.exports = {
  config: {
    name: "accountstatus",
    aliases: ["accstatus"],
    version: "1.0",
    author: "GoatAI by LiANE",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "GoatAI - Check account status",
      tl: "GoatAI - Tsek ang status ng account"
    },
    longDescription: {
      en: "GoatAI - Check if the user is restricted or not",
      tl: "GoatAI - Tingnan kung ang user ay naka-restring o hindi"
    },
    category: "goatBot",
    guide: {
      en: "{p}accountstatus",
      tl: "{p}status"
    }
  },
  onStart: async function({ event, message, threadsData, usersData, api }) {
    const senderID = event.senderID;
    const userData = await usersData.get(senderID);
    
    if (userData.restricted) {
      message.reply("❎ | Your account is restricted.");
    } else {
      message.reply("✅ | Your account is not restricted.");
    }
  }
};