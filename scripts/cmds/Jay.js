module.exports = {
  config: {
    name: "Jay",
    version: "1.0",
    author: "tokodori",
    countDown: 5,
    role: 0,
    shortDescription: "sarcasm",
    longDescription: "sarcasm",
    category: "reply",
  },
  onStart: async function () {},
  onChat: async function ({ event, message, getLang, api }) {
    const TokodoriRegex = /^(jay|Jay|jya|Jya)$/i;
    if (event.body && TokodoriRegex.test(event.body)) {
      await api.sendMessage("My Admin Is busy Sorry.", event.threadID, event.messageID);
      await api.sendMessageReaction("❔", event.messageID);
    }
  },
};