module.exports = {
  config: {
    name: "astroquiz",
    aliases: ["quiz"],
    version: "1.0",
    author: "jay",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Astroquiz - Test your knowledge about astrology",
      tl: "Astroquiz - Subukan ang iyong kaalaman sa astrology"
    },
    longDescription: {
      en: "Astroquiz - Test your knowledge about astrology by answering a series of questions.",
      tl: "Astroquiz - Subukan ang iyong kaalaman sa astrology sa pamamagitan ng pag sagot sa mga katanungan."
    },
    category: "goatBot",
    guide: {
      en: "{p}astroquiz",
      tl: "{p}astroquiz"
    },
  },
  onStart: async function ({ event, message, args }) {
    const questions = [
      {
        question: "What is the ruling planet of Taurus?",
        options: ["Venus", "Mars", "Jupiter", "Mercury"],
        correctAnswer: "Venus"
      },
      {
        question: "Which zodiac sign is known for being adventurous?",
        options: ["Cancer", "Leo", "Sagittarius", "Virgo"],
        correctAnswer: "Sagittarius"
      },
      {
        question: "What element is associated with the zodiac sign Pisces?",
        options: ["Water", "Fire", "Earth", "Air"],
        correctAnswer: "Water"
      },
      // Add more questions here
    ];

    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];

    let optionsStr = "";
    randomQuestion.options.forEach((option, index) => {
      optionsStr += `${index + 1}. ${option}\n`;
    });

    const questionMessage = `Question: ${randomQuestion.question}\nOptions:\n${optionsStr}`;

    message.reply(questionMessage);

    // Save the current question index for later use
    message.currentQuestionIndex = questions.indexOf(randomQuestion);
  },
  onReply: async function ({ event, message, reply }) {
    const { author, type, body } = event;

    if (author !== message.senderID) {
      return;
    }

    if (type === "message") {
      const userAnswer = body;
      const questionIndex = message.currentQuestionIndex;

      // Check if the user's answer is correct
      const questions = [
        {
          question: "What is the ruling planet of Taurus?",
          options: ["Venus", "Mars", "Jupiter", "Mercury"],
          correctAnswer: "Venus"
        },
        {
          question: "Which zodiac sign is known for being adventurous?",
          options: ["Cancer", "Leo", "Sagittarius", "Virgo"],
          correctAnswer: "Sagittarius"
        },
        {
          question: "What element is associated with the zodiac sign Pisces?",
          options: ["Water", "Fire", "Earth", "Air"],
          correctAnswer: "Water"
        },
        // Add more questions here
      ];

      const currentQuestion = questions[questionIndex];

      if (userAnswer.toLowerCase() === currentQuestion.correctAnswer.toLowerCase()) {
        message.reply("Correct answer! 🎉");
      } else {
        message.reply("Wrong answer. Try again! 👀");
      }

      // Continue with next question or end the quiz
      // You can implement the logic here
    }
  }
};