module.exports = {
  config: {
    name: "quote",
    aliases: [],
    version: "1.0",
    author: "Jay",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "GoatAI - Shares the daily quote for inspiration",
      tl: "GoatAI - Nagbabahagi ng araw-araw na quote para sa inspirasyon"
    },
    longDescription: {
      en: "GoatAI - Shares the daily quote for inspiration",
      tl: "GoatAI - Nagbabahagi ng araw-araw na quote para sa inspirasyon"
    },
    category: "goatBot",
    guide: {
      en: "{p}quoteoftheday",
      tl: "{p}quoteoftheday"
    }
  },

  onStart: async function ({ event, message, args, threadsData, usersData, api, commandName, role }) {
    const currentHour = new Date().getHours();
    const currentMinutes = new Date().getMinutes();
    if (currentHour === 23 && currentMinutes === 11) {
      const quotes = [
        "The only way to do great work is to love what you do. - Steve Jobs",
        "Believe you can and you're halfway there. - Theodore Roosevelt",
        "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
        "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
        "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
        "In the middle of every difficulty lies opportunity. - Albert Einstein",
        "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
        "Believe in yourself, take on your challenges, dig deep within yourself to conquer fears. - Chantal Sutherland",
        "Challenges are what make life interesting, and overcoming them is what makes life meaningful. - Joshua J. Marine"
      ];

      const quoteOfTheDay = quotes[Math.floor(Math.random() * quotes.length)];

      message.reply(`Here's your quote of the day: ${quoteOfTheDay}`);
    } else {
      const hoursRemaining = (23 - currentHour) + 1;
      const minutesRemaining = (60 - currentMinutes);
      message.reply(`The quote of the day will be available at ${hoursRemaining}:${minutesRemaining} PM.`);
    }
  }
}