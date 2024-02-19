module.exports = {
  config: {
    name: "escape",
    aliases: [],
    category: "goatBot",
    shortDescription: {
      en: "Escape from a virtual room by solving puzzles",
      tl: "Tumakas mula sa isang virtual na kuwarto sa pamamagitan ng pagsosolve ng mga puzzle",
    },
    longDescription: {
      en: "Escape from a virtual room by solving various puzzles and challenges. Use your skills and wit to find clues, unlock secrets, and ultimately escape!",
      tl: "Tumakas mula sa isang virtual na kuwarto sa pamamagitan ng pagsosolve ng iba't ibang mga puzzle at hamon. Gamitin ang iyong kasanayan at talino upang makahanap ng mga hint, buksan ang mga sikreto, at sa huli ay makatakas!",
    },
    guide: {
      en: "{p}escape",
      tl: "{p}escape",
    },
  },

  onStart: async function ({ event, message, args, usersData }) {
    if (message.body.toLowerCase() === "/escape") {
      // Code to start the escape room game
      await usersData.set(event.senderID, {
        answeringEscape: true // Mark the user as the one who can answer the question
      });
      message.reply("Welcome to the Escape Room! Get ready to solve puzzles and escape the room!");
      message.reply("Here's your first puzzle: What has keys but can't open locks?");
    }
  },

  onChat: async function ({ event, message, args, usersData }) {
    const userData = await usersData.get(event.senderID);
    const answeringEscape = userData.answeringEscape || false;

    if (answeringEscape) {
      // Code to handle user input during the escape room game
      if (event.message.body.toLowerCase() === "piano") {
        message.reply("That's correct! You found a key! Keep going!");
        // Code to proceed to the next puzzle or room
      } else {
        message.reply("Hmm, that's not the right answer. Keep trying!");
      }
    }
  },

  onReply: async function ({ event, message, reply, usersData }) {
    const userData = await usersData.get(event.senderID);
    const answeringEscape = userData.answeringEscape || false;

    if (answeringEscape) {
      // Code to handle replies during the escape room game
    }
  }
}