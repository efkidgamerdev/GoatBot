const fs = require('fs');
const filePath = './ratings.json';
let ratings = [];

try {
  const data = fs.readFileSync(filePath, 'utf-8');
  ratings = JSON.parse(data);
} catch (err) {
  console.log('Error reading ratings file:', err);
}

function saveRatings() {
  try {
    fs.writeFileSync(filePath, JSON.stringify(ratings));
  } catch (err) {
    console.log('Error saving ratings:', err);
  }
}

function getStars(rate) {
  const roundedRate = Math.round(rate * 2) / 2;
  const fullStars = '⭐'.repeat(Math.floor(roundedRate));
  const halfStar = (roundedRate % 1 !== 0) ? '⭐' : '';
  const stars = fullStars + halfStar;
  return stars;
}

function getAverageRating() {
  let total = 0;
  for (const rating of ratings) {
    total += rating.rate;
  }
  const average = total / ratings.length;
  return average.toFixed(1);
}

function getRatingRemarks(average) {
  if (average >= 4.5) {
    return "Excellent";
  } else if (average >= 4.0) {
    return "Good";
  } else if (average >= 3.0) {
    return "Average";
  } else {
    return "Below Average";
  }
}

module.exports = {
  config: {
    name: "rate",
    aliases: ["rating", "review"],
    version: 1.0,
    author: "Jay",
    countDown: 0,
    role: 0,
    shortDescription: { en: "Rate and review command" },
    longDescription: { en: "Command to rate and review" },
    category: "Reviews",
    guide: { en: ".rate <rating> <review> - Rate and review the bot" }
  },
  onStart: async function({ api, args, message, event, threadsData, usersData, dashBoardData }) {
    const cmd = args[0];

    if (cmd === "list") {
      const pageNumber = parseInt(args[1]) || 1;
      const entriesPerPage = 10;
      const startIndex = (pageNumber - 1) * entriesPerPage;
      const endIndex = startIndex + entriesPerPage;

      const totalPages = Math.ceil(ratings.length / entriesPerPage);
      if (pageNumber > totalPages || pageNumber < 1) {
        return message.reply(`🏆 𝗥𝗔𝗧𝗜𝗡𝗚 𝗖𝗠𝗗\n\nInvalid page number. Total pages: ${totalPages}`);
      }

      const ratingsPage = ratings.slice(startIndex, endIndex);
      let response = `--- Ratings Page ${pageNumber} ---\n\n`;
      for (const rating of ratingsPage) {
        const stars = getStars(rating.rate);
        response += `➡️ Name: ${rating.name}\n➡️ Rating: ${stars} (${rating.rate})\n➡️ Review: ${rating.review}\n\n`;
      }
      const averageRating = parseFloat(getAverageRating());
      const averageStars = getStars(averageRating);
      const ratingRemarks = getRatingRemarks(averageRating);
      response += `➡️ Average Rating: ${averageStars} (${averageRating}) \n➡️ Remarks ${ratingRemarks}`;
      return message.reply(response);
    }

    if (typeof args[0] === 'undefined' || typeof args[1] === 'undefined') {
      return message.reply('🏆 𝗥𝗔𝗧𝗜𝗡𝗚 𝗖𝗠𝗗\n\n🚫 Invalid syntax. Correct syntax: .rate <rating> <review>');
    }

    const rating = parseFloat(args[0]);
    const review = args.slice(1).join(' ');

    if (isNaN(rating) || rating < 1 || rating > 5) {
      return message.reply('🏆 𝗥𝗔𝗧𝗜𝗡𝗚 𝗖𝗠𝗗\n\nInvalid rating. Please enter a number between 1 and 5. Example: .rate 4.3 Really nice');
    }

    const userData = await usersData.get(event.senderID);
    const userName = userData ? userData.name : "Unknown User";
    const newRating = {
      name: userName,
      uid: event.senderID,
      rate: rating,
      review: review
    };
    ratings.unshift(newRating);
    saveRatings();

    return message.reply('🏆 𝗥𝗔𝗧𝗜𝗡𝗚 𝗖𝗠𝗗\n\n Successfully submitted your review! Thanks for giving feedback to Jay Bohol. You can edit your review anytime by resubmitting it. Use rate list to view all ratings');
  }
};