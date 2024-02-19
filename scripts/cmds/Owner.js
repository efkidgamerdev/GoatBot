module.exports = {
 config: {
 name: "Owner",
 version: "1.0",
 author: "Jay",
 countDown: 5,
 role: 0,
 shortDescription: "no prefix",
 longDescription: "no prefix",
 category: "no prefix",
 }, 
 onStart: async function(){}, 
 onChat: async function({ event, message, getLang }) {
 if (event.body && event.body.toLowerCase() === "owner") {
 return message.reply({
 body: "hello, i'm 𝗕𝗶𝗹𝗹𝘀 𝗮𝗶. follow my master senpai.                               𝗗𝗲𝘃 𝗟𝗶𝗻𝗸:https://www.facebook.com/profile.php?id=61550037082227",
 attachment: await global.utils.getStreamFromURL("https://i.imgur.com/awYlgCo.jpg")
 });
 }
 }
}