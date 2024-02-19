const fs = require('fs');
const fetch = require('node-fetch');

module.exports = {
  config: {
    name: "Women",
    version: "1.0",
    author: "Jay mego",
    countDown: 5,
    role: 0,
    shortDescription: "no prefix",
    longDescription: "no prefix",
    category: "no prefix",
  },
  onStart: async function(){},
  onChat: async function({ event, message, getLang }) {
    if (event.body && event.body.toLowerCase() === "women") {
      const response = await fetch("https://imgur.com/a/76d6QDC");
      const attachment = await response.buffer();

      return message.reply({
        body: "women☕",
        attachment: attachment,
      });
    }
  }
};