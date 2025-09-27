
import 'dotenv/config';
import { Client, Events, GatewayIntentBits } from 'discord.js';
import { chat } from './lib/ai.js';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.once(Events.ClientReady, () => {
    console.log(`Logged in as ${client.user?.tag}!`);
}
);


client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;
    if (message.author.id === client.user?.id) return;
    if (!message.guildId) return;
    if (!message.mentions.users.has(client.user!.id)) return;

    try{
        const response = await chat(message);
        await message.reply(response);
      
    } catch (error) {
        console.error('Error processing message:', error);
        await message.reply('Sorry, I encountered an error while processing your message.');
    }
});

client.login(process.env.DISCORD_BOT_TOKEN); 
