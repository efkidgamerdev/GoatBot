const axios = require("axios");
const Prefixes = [
  'gpt', 
];

module.exports = {
  config: {
    name: "gpt4",
    version: "1.0",
    author: "SiAM",
    countDown: 1,
    role: 0,
    shortDescription: {
      vi: "",
      en: ""
    },
    longDescription: {
      vi: "",
      en: "chatGPT with GPT 4 like model (this is not the original gpt4 but it's inspired from gpt4 model structure)."
    },
    category: "GPT",
    guide: {
      en: "{pn} 'query'\Example:\pn} hi there"
    }
  },
  onStart: async function ({ api, message, event, args }) {
    const userID = event.senderID;
    const query = encodeURIComponent(args.join(" "));

    if (!query) {
      message.reply("Please provide a query. \Example: /gpt How does photosynthesis work?");
      return;
    }

    try {
      const response = await axios.get(`https://gpt4.siam-apiproject.repl.co/api?uid=${userID}&query=${query}`);
      const answer = response.data.lastAnswer;

      if (answer) {
        message.reply({
          body: `𝗚𝗣𝗧: ${answer}\n𝗗𝗲𝘃 𝗟𝗶𝗻𝗸: https://www.facebook.com/profile.php?id=61550037082227`,
          attachment: '',
        });
        console.log('Sent answer as a reply to user');

        const cacheDir = path.join(__dirname, 'cache');
        if (!fs.existsSync(cacheDir)) {
          fs.mkdirSync(cacheDir);
        }
        const gttsPath = path.join(cacheDir, 'voice.mp3');
        const gttsInstance = new gtts(answer, 'en');

        gttsInstance.save(gttsPath, function (error) {
          if (error) {
            console.error("Error saving gTTS:", error);
            return;
          }
          api.sendMessage({
            body: "🗣 Voice Answer:",
            attachment: fs.createReadStream(gttsPath),
          }, event.threadID);
        });
      } else {
        console.error("Invalid API Response:", response.data);
        sendErrorMessage(message, "Server response is invalid ❌");
      }
    } catch (error) {
      console.error("Request Error:", error);
      sendErrorMessage(message, "Server not responding ❌");
    }
  },
  
  // ... rest of the code ...

};

function sendErrorMessage(message, errorMessage) {
  message.reply({ body: errorMessage });
}