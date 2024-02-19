module.exports = {
  config: {
      name: "Hello",
      version: "1.0",
      author: "Jay Senpai",
      countDown: 5,
      role: 0,
      shortDescription: "sarcasm",
      longDescription: "sarcasm",
      category: "reply",
  },
onStart: async function(){}, 
onChat: async function({
  event,
  message,
  getLang
}) {
  if (event.body && event.body.toLowerCase() == "hello") return message.reply("kumain kana?");
}
};