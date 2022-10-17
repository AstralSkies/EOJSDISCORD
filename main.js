// Discord Bot: Endless Online
// Author: AstralSkies
// Version: 1.0
// Description: A bot that allows you to play Endless Online in Discord.

// Ensure the bots previlege gateway intents are enabled.
const Discord = { Client, 
    GatewayIntentBits , 
    MessageAttachment, AttachmentBuilder, EmbedBuilder} = require('discord.js');

// Create a new client instance.
const client = new Discord.Client({
    intents: [GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent, 
        GatewayIntentBits.GuildMessageReactions] });

// Import the helper functions readChatlog() and sendChatlog().
const helper ={ readChatlog } = require('./helper.js');

// Embed the message returned from the helper function.
  const embed = new EmbedBuilder()
  .setColor('#0099ff')
  .setTitle('Chatlog')
  .setDescription(helper.readChatlog())

// Check if the bot is ready
client.once('ready', () => {
    console.log('I am ready!');
    // Call the ReadChatlog() function every 10seconds.
    setInterval(() => {
        // Read the chatlog file.
        client.channels.cache.get('1023637913868718103').send({ embeds: [embed] });
    }
    , 10000);
});

// If the user has stated a message in the channel.
client.on('messageCreate', message => {
    // Call the postMessage function. If the message is not from the bot.
    if (message.author.bot == false) {
        helper.postMessage(message.content);
    }
});

// Obtain the token from the json folder and log in.
client.login(require('./json/token.json').token);

// Export the client so it can be used in other files.
module.exports = client;