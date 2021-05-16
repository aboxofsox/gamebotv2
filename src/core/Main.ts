import {Client, Message, Intents, Guild} from 'discord.js';
import * as dotenv from 'dotenv';
import Commands from './commands/Commands';
dotenv.config();

export default class Main {
    private static client: Client;
    private static guild: Guild;
    static async init(token: string) {

        Main.client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});
        Main.client.login(token);
        Main.client.once('ready', () => {
            console.log(`Logged in as ${Main.client.user.tag}`)
            Commands.__init(Main.client);
        });

        Main.client.on('interaction', interaction => Commands.onCommand(interaction));
    }
}