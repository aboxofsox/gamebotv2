import {Client, Message} from 'discord.js';
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
    static init(token: string) {
        Main.client = new Client();
        Main.client.on('ready', () => console.log(`Logged in as ${Main.client.user.tag}`));
        Main.client.login(token);
        Main.client.on('message', (msg: Message) => this.command(msg));

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
                TwitchController.isStreamLive(streamer);
            case 'help' || 'h':
                Help.commands(msg);
                break;
        }
    }

    private static async embed(data: GBData, msg: Message) {
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

        msg.channel.send({embed: embedGB});

    }

    private static async embedTop(data: object[], msg: Message, genre: string) {
        if(data.length <= 0) return msg.channel.send('Sorry buddy, I got nothing.😟');
        const embed = {
            color: 0x0099ff,
            title: `Top ${genre} Games`,
            description: `${data.map((item: any, i: number) => `${i + 1}. ${item.name} | ${(item.metacritic == null) ? 'NA' : item.metacritic},`).join('\n')}`
        }

        msg.channel.send({embed: embed});
    }
}