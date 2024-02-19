const fs = require("fs");

module.exports = {
  config: {
    name: "balance",
    aliases: ["cash", "cashing"],
    version: 1.0,
    author: "Jay",
    shortDescription: { en: "Check your balance or transfer money" },
    longDescription: { en: "Check your balance or transfer money" },
    category: "Economy",
    guide: { en: "/money - Check your balance\/money transfer [recipient] [amount] - Transfer money" }
  },
  onStart: async function ({ api, args, message, event, threadsData, usersData, dashBoardData }) {
    const command = args[0];
    const senderID = event.senderID;
    const userData = await usersData.get(senderID);
    const userName = userData ? userData.name : "Unknown User";
    const userMoney = userData?.money || 0;

    const taxRate = 0.04; // 0.04% tax per minute
    const elapsedTime = await getElapsedTime(senderID);
    const currentTime = Date.now();
    const elapsedMinutes = Math.floor(elapsedTime / (1000 * 60)); // Convert milliseconds to minutes
    const totalTaxFunds = await getTotalTaxFunds();

    const deductAmount = Math.min(Math.floor(userMoney * (taxRate / 100) * elapsedMinutes), userMoney);
    const updatedMoney = userMoney - deductAmount;

    if (deductAmount > 0) {
      await updateElapsedTime(senderID, currentTime);
      await updateTotalTaxFunds(totalTaxFunds + deductAmount);
    }

    if (command === "transfer") {
      const recipient = args[1];
      const amount = parseFloat(args[2]);

      if (isNaN(amount)) {
        message.reply("🎀 Nipsey 𝗕𝗮𝗯𝘆 :\n\nInvalid amount. Please provide a valid number.");
        return;
      }

      if (updatedMoney < amount) {
        message.reply("🎀 Nipsey 𝗕𝗮𝗯𝘆 :\n\nYou don't have enough money to transfer.");
        return;
      }

      const recipientData = await usersData.get(recipient);
      const recipientName = recipientData ? recipientData.name : "Unknown User";
      const transferAmount = Math.floor(amount * 0.95); // 0.05% tax on transfer amount

      if (recipientData) {
        const recipientMoney = recipientData.money || 0;
        const senderData = await usersData.get(senderID);
        const senderMoney = senderData.money || 0;

        if (senderMoney >= amount) {
          const updatedSenderMoney = senderMoney - amount;
          const updatedRecipientMoney = recipientMoney + transferAmount;

          await usersData.set(senderID, { money: updatedSenderMoney });
          await usersData.set(recipient, { money: updatedRecipientMoney });

          message.reply(`🎀 Nipsey 𝗕𝗮𝗯𝘆 :\n\nSuccessfully transferred 💰${transferAmount} to ${recipientName}`);
        } else {
          message.reply("🎀 Nipsey 𝗕𝗮𝗯𝘆 :\n\nYou don't have enough money to transfer.");
        }
      } else {
        message.reply("Recipient not found.");
      }
    } else {
      message.reply(`🎀 Nipsey 𝗕𝗮𝗯𝘆 :\n\n🎀 𝗡𝗔𝗠𝗘: ${userName}\n\n💳 𝗕𝗔𝗟𝗔𝗡𝗖𝗘: 💰${updatedMoney}\n\n🔶 𝗗𝗘𝗗𝗨𝗖𝗧𝗘𝗗 𝗜𝗡 𝗟𝗔𝗦𝗧 𝗖𝗛𝗘𝗖𝗞 : 💰${deductAmount}\n\n💸 𝗧𝗢𝗧𝗟𝗘 𝗧𝗔𝗫 𝗙𝗨𝗡𝗗𝗦 𝗖𝗢𝗟𝗟𝗘𝗖𝗧𝗘𝗗: 💰${totalTaxFunds} \n\n ⚠️ 𝗠𝗢𝗥𝗘 𝗢𝗣𝗧𝗜𝗢𝗡𝗦 :- \n✅ If you want more money So play quiz game\n🏧 [ .spin ] - chance to won 50,000 💰 Dollors\n☯️ [ .quiz ] - Play quiz game earn money.\n🎰 [ .slot ] - Bet amount and Chance to won extra money 💰\n🎁 [ .buyvip ] - Buy VIP subscription for more binifit😺\n🔶➖➖➖(◍•ᴗ•◍)➖➖➖`);
    }
  }
};

async function getElapsedTime(userID) {
  try {
    const taxData = JSON.parse(await fs.promises.readFile("taxData.json"));
    return taxData[userID]?.elapsedTime || 0;
  } catch (error) {
    return 0;
  }
}

async function updateElapsedTime(userID, currentTime) {
  try {
    const taxData = JSON.parse(await fs.promises.readFile("taxData.json"));
    taxData[userID] = { ...taxData[userID], elapsedTime: currentTime };
    await fs.promises.writeFile("taxData.json", JSON.stringify(taxData));
  } catch (error) {
    return;
  }
}

async function getTotalTaxFunds() {
  try {
    const taxData = JSON.parse(await fs.promises.readFile("taxData.json"));
    return taxData.totalTaxFunds || 0;
  } catch (error) {
    return 0;
  }
}

async function updateTotalTaxFunds(totalTaxFunds) {
  try {
    const taxData = JSON.parse(await fs.promises.readFile("taxData.json"));
    taxData.totalTaxFunds = totalTaxFunds;
    await fs.promises.writeFile("taxData.json", JSON.stringify(taxData));
  } catch (error) {
    return;
  }
}