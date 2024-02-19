const fs = require("fs");

const vipFilePath = "vip.json";

function loadVIPData() {
  try {
    const data = fs.readFileSync(vipFilePath);
    return JSON.parse(data);
  } catch (err) {
    console.error("Error loading VIP data:", err);
    return {};
  }
}

function saveVIPData(data) {
  try {
    fs.writeFileSync(vipFilePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error saving VIP data:", err);
  }
}

module.exports = {
  config: {
    name: "status",
    version: "1.0",
    author: "Jay",
    role: 0,
    category: "Utility",
    guide: {
      en: "{pn} status - Check user status",
    },
  },

  onStart: async function ({ api, event, message, usersData }) {
    const uid = event.senderID;

    // Load VIP data from the JSON file
    let vipData = loadVIPData();

    if (vipData[uid]) {
      const userData = await usersData.get(uid);
      const userName = userData ? userData.name : "Unknown User";
      return message.reply(`👑 𝗩𝗜𝗣 𝗨𝗦𝗘𝗥\n𝗡𝗔𝗠𝗘:➡️ 【 ${userName} 】\n𝗦𝗧𝗔𝗧𝗨𝗦:➡️ OUR RESPECTED VIP SUBSCRIBER\n𝗨𝗦𝗘𝗥 𝗨𝗜𝗗: ⬇️ 【 ${uid} 】`);
    } else {
      const userData = await usersData.get(uid);
      const userName = userData ? userData.name : "Unknown User";
      return message.reply(`🆓 𝗙𝗥𝗘𝗘 𝗨𝗦𝗘𝗥\n𝗡𝗔𝗠𝗘:➡️ 【 ${userName} 】\n𝗦𝗧𝗔𝗧𝗨𝗦:➡️ OUR FREE SUBSCRIBE\n🚫 LIMITED ACCESS USER\n𝗨𝗦𝗘𝗥 𝗨𝗜𝗗: ⬇️ 【 ${uid} 】`);
    }
  }
};