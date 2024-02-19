
global.fff = [];

module.exports = {
  config: {
    name: "tictactoe",
    version: "1.1",
    author: "Jay senpai",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: ""
    },
    longDescription: {
      vi: "",
      en: ""
    },
    category: "game",
    guide: "",
  },

  onStart: async function ({ event, message, api, usersData, args }) {
    const mention = Object.keys(event.mentions);

    if (args[0] == "close") {
      if (
        !global.game.hasOwnProperty(event.threadID) ||
        global.game[event.threadID].on == false
      ) {
        message.reply("There is no game running in this group");
      } else {
        if (
          event.senderID == global.game[event.threadID].player1.id ||
          event.senderID == global.game[event.threadID].player2.id
        ) {
          if (event.senderID == global.game[event.threadID].player1.id) {
            message.reply({
              body: `What a cry baby. ${global.game[event.threadID].player1.name} left the game.\nWinner is ${global.game[event.threadID].player2.name}.`,
              mentions: [
                {
                  tag: global.game[event.threadID].player1.name,
                  id: global.game[event.threadID].player1.id,
                },
                {
                  tag: global.game[event.threadID].player2.name,
                  id: global.game[event.threadID].player2.id,
                },
              ],
            });
          } else {
            message.reply({
              body: `What a cry baby. ${global.game[event.threadID].player2.name} left the game.\nWinner is ${global.game[event.threadID].player1.name}.`,
              mentions: [
                {
                  tag: global.game[event.threadID].player1.name,
                  id: global.game[event.threadID].player1.id,
                },
                {
                  tag: global.game[event.threadID].player2.name,
                  id: global.game[event.threadID].player2.id,
                },
              ],
            });
          }
          global.game[event.threadID].on = false;
        } else {
          message.reply(
            "You don’t have any game running in this group"
          );
        }
      }
    } else {
      if (mention.length == 0)
        return message.reply(
          "Please mention someone or say game close to close any existing game"
        );
      if (
        !global.game ||
        !global.game.hasOwnProperty(event.threadID) ||
        !global.game[event.threadID] ||
        global.game[event.threadID].on === false
      ) {
        if (!global.game) {
          global.game = {};
        }

        global.game[event.threadID] = {
          on: true,
          board: "🔲🔲🔲\🔲🔲🔲\🔲🔲🔲",
          bid: "",
          board2: "123456789",
          avcell: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
          turn: mention[0],
          player1: { id: mention[0], name: await usersData.getName(mention[0]) },
          player2: { id: event.senderID, name: await usersData.getName(event.senderID) },
          bidd: "❌",
          bid: "",
          ttrns: [],
          counting: 0,
        };
        message.send(
          global.game[event.threadID].board,
          (err, info) => {
            global.game[event.threadID].bid = info.messageID;
            global.fff.push(info.messageID);
          }
        );
      } else {
        message.reply(" A game is already on this group");
      }
    }
  },
  onReply: async function ({ event, message, api, args }) {
    if (event.type == "message" && event.body.includes("-,-")) {
      message.reply({
        body: " hehe baka fak u",
        attachment: await global.utils.getStreamFromURL(
          "https://scontent.xx.fbcdn.net/v/t1.15752-9/316181740_667600474745895_5536856546858630902_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=ae9488&_nc_ohc=bR-GcvE6RHMAX_YE5bu&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdQk45VA6QO5_X5vTQJYdXF4nH45UeESYppxrFbZdRlJMw&oe=63A3009D"
        ),
      });
    }

    if (
      event.type == "message_reply" &&
      global.game[event.threadID] &&
      global.game[event.threadID].on == true
    ) {
      if (
        event.messageReply.messageID === global.game[event.threadID].bid
      ) {
        console.log("bal");
        if (global.game[event.threadID].turn === event.senderID) {
          console.log("sal");
          if (["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(event.body)) {
            if (global.game[event.threadID].avcell.includes(event.body)) {
              global.game[event.threadID].avcell.splice(
                global.game[event.threadID].avcell.indexOf(event.body),
                1
              );

              let input2 = event.body * 2;

              global.game[event.threadID].ttrns.map((e) => {
                if (e < event.body) {
                  input2--;
                }
              });

              if (["4", "5", "6"].includes(event.body)) {
                input2++;
              } else if (["7", "8", "9"].includes(event.body)) {
                input2 += 2;
              }

              global.game[event.threadID].board = replaceAt(
                global.game[event.threadID].board,
                global.game[event.threadID].bidd,
                input2 - 2
              );
              global.game[event.threadID].board2 = replace(
                global.game[event.threadID].board2,
                event.body,
                global.game[event.threadID].bidd
              );

              message.send(global.game[event.threadID].board, (err, infos) => {
                global.game[event.threadID].bid = infos.messageID;
                global.fff.push(infos.messageID);
              }); //ttrns.pus

              let winncomb = [
                global.game[event.threadID].board2[0] === global.game[event.threadID].bidd &&
                global.game[event.threadID].board2[1] === global.game[event.threadID].bidd &&
                global.game[event.threadID].board2[2] === global.game[event.threadID].bidd,
                global.game[event.threadID].board2[3] === global.game[event.threadID].bidd &&
                global.game[event.threadID].board2[4] === global.game[event.threadID].bidd &&
                global.game[event.threadID].board2[5] === global.game[event.threadID].bidd,
                global.game[event.threadID].board2[6] === global.game[event.threadID].bidd &&
                global.game[event.threadID].board2[7] === global.game[event.threadID].bidd &&
                global.game[event.threadID].board2[8] === global.game[event.threadID].bidd,
                global.game[event.threadID].board2[0] === global.game[event.threadID].bidd &&
                global.game[event.threadID].board2[3] === global.game[event.threadID].bidd &&
                global.game[event.threadID].board2[6] === global.game[event.threadID].bidd,
                global.game[event.threadID].board2[1] === global.game[event.threadID].bidd &&
                global.game[event.threadID].board2[4] === global.game[event.threadID].bidd &&
                global.game[event.threadID].board2[7] === global.game[event.threadID].bidd,
                global.game[event.threadID].board2[2] === global.game[event.threadID].bidd &&
                global.game[event.threadID].board2[5] === global.game[event.threadID].bidd &&
                global.game[event.threadID].board2[8] === global.game[event.threadID].bidd,
                global.game[event.threadID].board2[0] === global.game[event.threadID].bidd &&
                global.game[event.threadID].board2[4] === global.game[event.threadID].bidd &&
                global.game[event.threadID].board2[8] === global.game[event.threadID].bidd,
                global.game[event.threadID].board2[2] === global.game[event.threadID].bidd &&
                global.game[event.threadID].board2[4] === global.game[event.threadID].bidd &&
                global.game[event.threadID].board2[6] === global.game[event.threadID].bidd,
              ];

              let succes;

              if (winncomb.includes(true)) {
                succes = true;
              }

              if (
                succes === true ||
                (!global.game[event.threadID].avcell.includes("1") &&
                  !global.game[event.threadID].avcell.includes("2") &&
                  !global.game[event.threadID].avcell.includes("3") &&
                  !global.game[event.threadID].avcell.includes("4") &&
                  !global.game[event.threadID].avcell.includes("5") &&
                  !global.game[event.threadID].avcell.includes("6") &&
                  !global.game[event.threadID].avcell.includes("7") &&
                  !global.game[event.threadID].avcell.includes("8") &&
                  !global.game[event.threadID].avcell.includes("9"))
              ) {
                if (
                  global.game[event.threadID].turn ===
                  global.game[event.threadID].player1.id
                ) {
                  message.reply({
                    body: `${global.game[event.threadID].player1.name} is the winner 🙂}`,
                    mentions: [
                      {
                        tag: global.game[event.threadID].player1.name,
                        id: global.game[event.threadID].player1.id,
                      },
                    ],
                  });
                  global.game[event.threadID].on = false;
                }
                if (
                  global.game[event.threadID].turn ===
                  global.game[event.threadID].player2.id
                ) {
                  message.reply({
                    body: `${global.game[event.threadID].player2.name} is the winner 🙂}`,
                    mentions: [
                      {
                        tag: global.game[event.threadID].player2.name,
                        id: global.game[event.threadID].player2.id,
                      },
                    ],
                  });
                  global.game[event.threadID].on = false;
                }
              } else {
                if (
                  global.game[event.threadID].turn ===
                  global.game[event.threadID].player1.id
                ) {
                  global.game[event.threadID].turn =
                    global.game[event.threadID].player2.id;
                  global.game[event.threadID].bidd = "⭕";
                  message.reply({
                    body: `Now it's ${global.game[event.threadID].player2.name}'s turn.`,
                    mentions: [
                      {
                        tag: global.game[event.threadID].player2.name,
                        id: global.game[event.threadID].player2.id,
                      },
                    ],
                  });
                } else {
                  global.game[event.threadID].turn =
                    global.game[event.threadID].player1.id;
                  global.game[event.threadID].bidd = "❌";
                  message.reply({
                    body: `Now it's ${global.game[event.threadID].player1.name}'s turn.`,
                    mentions: [
                      {
                        tag: global.game[event.threadID].player1.name,
                        id: global.game[event.threadID].player1.id,
                      },
                    ],
                  });
                }
              }
            }
          }
        }
      }
    }
  },
};

function replaceAt(string, replace, index) {
  return string.slice(0, index) + replace + string.slice(index + 1);
}

function replace(string, find, replace) {
  return string.split(find).join(replace);
            }