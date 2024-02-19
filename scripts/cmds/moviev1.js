const fetch = require("node-fetch");

module.exports = {
  config: {
    name: "movie",
    aliases: ["film"],
    version: "1.0",
    author: "Jay",
    category: "goatBot",
    shortDescription: {
      en: "Get information about a specific movie",
      tl: "Maaaring impormasyon tungkol sa isang partikular na pelikula"
    },
    longDescription: {
      en: "Get information about a specific movie, such as ratings, cast, and plot",
      tl: "Makuha ang impormasyon tungkol sa isang partikular na pelikula tulad ng mga rating, mga artista, at plot"
    },
    role: 0,
    guide: {
      en: "{p}movie <movie title>",
      tl: "{p}movie <pamagat ng pelikula>"
    }
  },
  onStart: async function ({ event, message, args, api }) {
    const movieTitle = args.join(" ");

    // Check if movie title is provided
    if (!movieTitle) {
      message.reply("Please provide a movie title.");
      return;
    }

    // Fetch movie information from the OMDB API
    const apiKey = "608a52b6a5b6e275e10a102d5b4e656c";
    const readAccessToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MDhhNTJiNmE1YjZlMjc1ZTEwYTEwMmQ1YjRlNjU2YyIsInN1YiI6IjY1N2FkNGI2N2EzYzUyMDBhZDFhNjY2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gkNmIyjzi1kPHZ86frad0O0sFycfP2262z617KkOiW4";
    const url = `http://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=${apiKey}&access_token=${readAccessToken}`;
    const response = await fetch(url);
    const data = await response.json();

    // Check if movie information is available
    if (!data || data.Response === "False") {
      message.reply("No information found for that movie.");
      return;
    }

    // Extract relevant information from the data object
    const { Title, Year, Rated, Released, Runtime, Genre, Director, Actors, Plot, imdbRating } = data;

    // Construct the movie information message
    let movieInfo = `Title: ${Title}\n`;
    movieInfo += `Year: ${Year}\n`;
    movieInfo += `Rated: ${Rated}\n`;
    movieInfo += `Released: ${Released}\n`;
    movieInfo += `Runtime: ${Runtime}\n`;
    movieInfo += `Genre: ${Genre}\n`;
    movieInfo += `Director: ${Director}\n`;
    movieInfo += `Actors: ${Actors}\n`;
    movieInfo += `Plot: ${Plot}\n`;
    movieInfo += `IMDb Rating: ${imdbRating}`;

    // Send the movie information message
    message.reply(movieInfo);
  }
};