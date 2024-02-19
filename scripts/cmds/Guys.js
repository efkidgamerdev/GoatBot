module.exports = {
    config: {
        name: "Guys",
        version: "1.0",
        author: "Jay",
        countDown: 5,
        role: 0,
        shortDescription: "No Prefix",
        longDescription: "No Prefix",
        category: "reply",
    },
onStart: async function(){}, 
onChat: async function({
    event,
    message,
    getLang
}) {
    if (event.body && event.body.toLowerCase() == "guys") return message.reply("Don't Call Me Guys Cuz I AM Yours😊");
}
};