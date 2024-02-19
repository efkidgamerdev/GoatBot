const axios = require("axios");
const fs = require("fs");

const vipFilePath = "vip.json";

function loadVIPData() {
  // Function to load VIP data from vip.json
  try {
    const data = fs.readFileSync(vipFilePath);
    return JSON.parse(data);
  } catch (err) {
    console.error("Error loading VIP data:", err);
    return {};
  }
}
 // Step 1: Import the 'fs' module

        const Prefixes = [
          '/nipsey','.nipsey','nipsey'
        ];

        let promptData = []; // Step 2: Create an empty array

        module.exports = {
          config: {
            name: 'nipsey',
            aliases : ['nipsey'],
            version: '1.0',
            author: 'Jay bohol', 
            role: 0,
            countDown: 0,
            category: 'nipsey Ai',
            shortDescription: {
              en: 'Asks an AI for an answer.',
            },
            longDescription: {
              en: 'Asks an AI for an answer based on the user prompt.',
            },
            guide: {
              en: '{pn} [prompt]',
            },
          },
          onStart: async function () {},
          onChat: async function ({ api, event, args, message }) {
            try {

const vipData = loadVIPData(); // Load VIP data from vip.json
      const blockedCommands = ["rea"]; // List of commands that require VIP access

      if (blockedCommands.includes(this.config.name)) {
        // Check if the user's UID is in the VIP list
        if (!vipData[event.senderID]) {
          message.reply("👑 VIP Users 👑\n⛔ Error! You are not VIP.");
          return; // Exit the function to prevent the command from executing
        }
      }
              const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));

              if (!prefix) {
                return; 
              }

              const prompt = `Interact as NIPSEY CHATBOT beta v1,Created by JAY D BOHOL 🍒, Question: ${event.body.substring(prefix.length).trim()}`;

              if (prompt === '') {
                await message.reply(
                  "💬NIPSEY 𝗖𝗛𝗔𝗧𝗕𝗢𝗧 𝘃1\n\n"
                );
                return;
              }

              // Store the prompt and user ID in the array
              promptData.push({ prompt, uid: event.senderID }); // Step 3

              const response = await axios.get(`https://chatgayfeyti.archashura.repl.co?gpt=${encodeURIComponent(prompt)}`);

              if (response.status !== 200 || !response.data) {
                throw new Error('Invalid or missing response from API');
              }

              const messageText = response.data.content.trim();

              // Prepend "🤖 𝗢𝗿𝗼𝗰𝗵𝗶: " to the response
              await message.reply(`💬NIPSEY 𝗖𝗛𝗔𝗧𝗕𝗢𝗧 𝘃1\n\n${messageText}`);

              console.log('Sent answer as a reply to user');

              // Step 4: Write the promptData array to a JSON file
              fs.writeFileSync('prompt.json', JSON.stringify(promptData, null, 2), 'utf8');
            } catch (error) {
              console.error(`Failed to get an answer: ${error.message}`);
              api.sendMessage(
                `${error.message}`,
                event.threadID
              );
            }
          },
        };
