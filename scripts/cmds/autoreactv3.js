module.exports = {
  config: {
    name: "autoreact | NOTCMD",
    version: "1.0",
    author: "Jay",
    countDown: 5,
    role: 0,
    shortDescription: "sarcasm",
    longDescription: "sarcasm",
    category: "reply",
  },
  onStart: async function () {},
  onChat: async function ({ api, event, client, __GLOBAL }) {
    var { threadID, messageID } = event;
    let react = event.body.toLowerCase();
    const badWords = ["kain", "yie", "paiyot", "pokpok", "chupa", "sex", "bilat", "belat", "puke", "puday", "lalaki", "buti pa", "hehe", "mwah", "mwuah", "baby", "iyot", "bby", "bebe", "luck", "inita", "afternoon", "aftie", "morning", "peste", "kayat", "kainit", "seggs", "jerjer", "kayat", "utin"];
  
    if (badWords.some(word => event.body.toLowerCase().indexOf(word) == 0) && !bot.includes(event.senderID)) {
      var msg = {
        body: "",
      };
      api.sendMessage(msg, threadID, messageID);
      api.setMessageReaction("🥵", event.messageID, (err) => {}, true);
    }
  },
};