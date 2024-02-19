const axios = require('axios');

module.exports = {
  config: {
    name: "autogreet",
    author: "Ryan Funky", // Convert To Goat By Tokodori
    role: 2,
    shortDescription: " ",
    longDescription: "",
    category: "BOT",
    guide: "{pn}"
  },

onStart: async function({ api, event, args, Users }) {
  const time = args[0];
  const text = args.join(" ").replace(time, "");
  if (isNaN(time)) return api.sendMessage(`oopss undefined, the time you entered is not a number!`, event.threadID, event.messageID);
  const display = time > 59 ? `${time / 60} minutes` : `${time} seconds`;
  api.sendMessage(`I'll remind you later: ${display}`, event.threadID, event.messageID);
  await new Promise(resolve => setTimeout(resolve, time * 1000));
  var value = await api.getThreadInfo(event.threadID);
  if (!(value.nicknames)[event.userID]) value = (await Users.getInfo(event.senderID)).name;
  else value = (value.nicknames)[event.senderID];

  // Send greeting gif photo every hour
  setInterval(async () => {
    try {
      const response = await axios.get('https://some-gif-api.com/random-gif');
      const gifUrl = response.data.url;
      api.sendMessage({
        body: `Good hour, ${value}! Here's a random gif for you:`,
        attachment: axios({
          url: gifUrl,
          responseType: 'arraybuffer'
        }),
        mentions: [{
          tag: value,
          id: event.senderID
        }]
      }, event.threadID);
    } catch (error) {
      console.error(error);
    }
  }, 3600000); // 1 hour = 3600000 milliseconds
}
};