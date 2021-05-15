import {Client, Message, Intents, CommandInteraction, Interaction, ApplicationCommandData} from 'discord.js';
import {GBData, TopGames} from '../interfaces';
import API from './api/API.module';
import Trivia from './quiz/trivia.module';
import TopRated from './top-rated/TopRated';
import TwitchController from './twitch/twitch-controller';
import {Help} from './util/utils';
import * as dotenv from 'dotenv';
dotenv.config();

export default class Main {
    private static client: Client;
    static async init(token: string) {

        
          

        Main.client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});
        Main.client.login(token);
        Main.client.once('ready', () => {
            console.log(`Logged in as ${Main.client.user.tag}`)
            this.cmdinit();
        });
        // Main.client.on('message', (msg: Message) => this.command(msg));

    }

    private static cmdinit() {
        const queryData: ApplicationCommandData = {
            name: 'search',
            description: 'Get video game information.',
            options: [{
              name: 'query',
              type: 'STRING',
              description: 'Embeded game data.',
              required: true,
            }]
        };

        const topData: ApplicationCommandData = {
            name: 'top',
            description: 'Get top video games of a specific genre.',
            options: [{
                name: 'genre',
                type: 'STRING',
                description: 'Embeded top game data.',
                required: true
            }]
        };

        [queryData, topData].map(cmd => Main.client.application.commands.create(cmd));
        Main.client.on('interaction', (interaction: Interaction) => this.cmdInt(interaction))

    }
    
    private static async cmdInt(interaction: Interaction) {
        if(!interaction.isCommand()) return;
        switch(interaction.commandName) {
            case 'search':
                let data = await API.search(interaction.options[0].value.toString());
                data = data.redirect ? await API.redirect(data.slug) : await API.search(interaction.options[0].value.toString());
                this.embed(data, null, interaction);

                break;
            case 'top':
                let top = await TopRated.go(interaction.options[0].value.toString());
                this.embedTop(top, null, interaction.options[0].value.toString(), interaction);
                
                break;
        }
    }

    private static async command(msg: Message) {
        if(msg.content.indexOf('!') !== 0) return;

        const args: string[] = msg.content.slice('!'.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        
        
        switch(command) {
            case 'gb':
                let query = args.join(' ');
                let data = await API.search(query);
                data = data.redirect ? await API.redirect(data.slug) : await API.search(query);

                this.client

                this.embed(data, msg);
          
                break;
            case 'ping':
                msg.channel.send('pong');
                break;
            case 'trivia':
                Trivia.init(msg);
                break;
            case 'top':
                let genre = args.join(' ');
                let top = await TopRated.go(genre);
                this.embedTop(top, msg, genre);
                break;
            case 'twitch':
                let streamer = args.join(' ');
                let info = await TwitchController.isStreamLive(streamer);
                console.log(info);
                break;
            case 'help' || 'h':
                Help.commands(msg);
                break;
        }
    }

    private static async embed(data: GBData, msg?: Message, int?: CommandInteraction) {
        const embedGB = {
            color: 0x0099ff,
            title: data.name,
            fields: [
                {
                    name: 'Developers',
                    value: data.developers.name,
                    inline: true
                },
                {
                    name: 'Publishers',
                    value: data.publishers.name,
                    inline: true
                },
                {
                    name: 'Released',
                    value: (new Date(data.updated)).toLocaleString(),
                    inline: true
                },
                {
                    name: 'Updated',
                    value: data.updated,
                    inline: true
                },
                {
                    name: 'Metacritic',
                    value: (data.metacritic == null) ? 'NA' : data.metacritic.toString(),
                    inline: true
                },
                {
                    name: 'Reddit',
                    value: (data.reddit_name.length <= 0) ? 'NA' : data.reddit_name,
                    inline: true
                }
            ],
            thumbnail: {
                url: data.background_image
            }
        }

        // msg.channel.send({embed: embedGB});
        int.reply({embeds: [embedGB]});

    }

    private static async embedTop(data: object[], msg?: Message, genre?: string, int?: CommandInteraction) {
        if(data.length <= 0) return msg.channel.send('Sorry buddy, I got nothing.😟');
        const embed = {
            color: 0x0099ff,
            title: `Top ${genre} Games`,
            description: `${data.map((item: any, i: number) => `${i + 1}. ${item.name} | ${(item.metacritic == null) ? 'NA' : item.metacritic},`).join('\n')}`
        }

        // msg.channel.send({embed: embed});
        int.reply({embeds: [embed]});
    }
}