module.exports = {
  config: {
    name: "fbaccgenerator",
    aliases: ["fba", "fbacc"],
    version: "1.0",
    author: "Jay",
    countdown: 5,
    role: 0,
    shortDescription: {
      en: "Generate a fake Facebook account",
    },
    longDescription: {
      en: "This command generates a fake Facebook account for testing purposes.",
    },
    category: "goatBot",
    guide: {
      en: "{p}fbaccgenerator",
    },
  },

  onStart: async function ({ event, message, threadsData, usersData, api }) {
    const firstname = generateRandomName();
    const lastname = generateRandomName();
    const username = generateRandomUsername();
    const email = generateRandomEmail();
    const password = generateRandomPassword();

    const accountInfo = `
    Generated Facebook Account:
    Name: ${firstname} ${lastname}
    Username: ${username}
    Email: ${email}
    Password: ${password}`;

    message.reply(accountInfo);
  },
};

function generateRandomName() {
  const names = ["John", "Jane", "Bob", "Alice"];
  return names[Math.floor(Math.random() * names.length)];
}

function generateRandomUsername() {
  const usernames = ["johndoe123", "janedoe456", "bobsmith789", "alicejohnson", "Ninjakase", "imsxkni"];
  return usernames[Math.floor(Math.random() * usernames.length)];
}

function generateRandomEmail() {
  const domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "ezztt.com", "icznn.com"];
  const email = generateRandomUsername() + "@" + domains[Math.floor(Math.random() * domains.length)];
  return email;
}

function generateRandomPassword() {
  const possibleChars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < 8; i++) {
    password += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
  }
  return password;
}