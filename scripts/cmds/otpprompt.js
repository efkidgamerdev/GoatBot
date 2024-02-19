module.exports = {
  config: {
    name: "otpprompt",
    version: "1.0.0",
    author: "Minn",
    description: "Generate OTP prompts from provided names",
    category: "fun",
    usage: "name + name",
    cooldown: 3,
  },

  onStart: async function ({ api, event, args }) {
    const input = args.join(" ");
    const matches = input.match(/(\w+)\s*\+\s*(\w+)/g);

    if (!matches || matches.length === 0) {
      api.sendMessage(
        `Please provide names separated by "+".\nFor example: otpprompt you + me`,
        event.threadID,
        event.messageID
      );
      return;
    }

    const prompts = [
      "They met at a {A} convention and their eyes locked across the room.",
      "{A} watched {B} from afar, secretly admiring their grace and charm.",
      "In a world filled with chaos, {A} found solace in the presence of {B}.",
      "{A} had a secret crush on {B} for years but never had the courage to confess.",
      "Their love story began on a rainy day when {A} offered {B} an umbrella.",
      "Amidst the hustle and bustle of the city, {A} and {B} found serenity in each other's arms.",
      "Their love was like a cozy fireplace, warm and comforting on a cold winter night.",
    ];

    const randomp = Math.floor(Math.random() * prompts.length);
    const getrandom = prompts[randomp];

    let msg = getrandom;
    for (const match of matches) {
      const [A, B] = match.split(/\s*\+\s*/);
      msg = msg.replace(/{A}/g, A).replace(/{B}/g, B);
    }
    api.sendMessage(msg, event.threadID, event.messageID);
  },
};
