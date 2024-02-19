module.exports = {
  config: {
    name: "pinayporn",
    aliases: ["pporn"],
    category: "goatBot",
    role: 0,
    shortDescription: {
      en: "Pinay Porn!",
      tl: "Pinay Porn!"
    },
    longDescription: {
      en: "Get Pinay Porn!",
      tl: "Kumuha ng Pinay Porn!"
    },
    guide: {
      en: "{p}pinayporn",
      tl: "{p}pinayporn"
    }
  },

  onStart: async function ({ event, message, api }) {
    // Implement your code here to fetch and send the Pinay Porn image or video
    // You can use the `message.reply` function to send the response
    // Make sure to use proper error handling and check for any validation rules before sending the content
    // Example:
    try {
      const response = await fetch( "https://api.easy0.repl.co/api/pnayflex?s=");
      const data = await response.json();

      // Send the content using message.reply
      message.reply(data.url);
    } catch (error) {
      console.error(error);
      message.reply("An error occurred while fetching the Pinay Porn content.");
    }
  }
}