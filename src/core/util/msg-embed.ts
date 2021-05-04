import {Message} from 'discord.js';
import {GBData} from '../../interfaces';
export default class MessageEmbeder {
    private topEmbed(data: object[], msg: Message, genre: string) {
        if(data.length <= 0) return msg.channel.send(`Sorry buddy, I got nothing. 😞`);
        const TOP_EMBED = {
            color: 0x0099ff,
            title: `Top ${genre} Games`,
            description: `${data.map((item: any, i: number) => `${i + 1}. ${item.name} | ${(item.metacritic == null) ? 'NA' : item.metacritic},`).join('\n')}`
        }

        msg.channel.send({embed: TOP_EMBED});
    }
    private gameEmbed(msg: Message, data: GBData) {
        const GAME_EMBED = {
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

        msg.channel.send({embed: GAME_EMBED});
    }
    private helpEmbed(msg: Message) {
        const HELP_EMBED = {
            title: 'Useful Commands',
            fields: [
                {
                    name: 'Game Information',
                    value: '!gb [name of game]',
                    inline: true
                },
                {
                    name: 'Top in Genre',
                    value: '!top [genre',
                    inline: true
                },
                {
                    name: 'Get Twitch Stream Information',
                    value: '!twitch [streamer]',
                    inline: true
                }
            ]
        }

        msg.channel.send({embed: HELP_EMBED});
    }
    private twitchEmbed(msg: Message, data: Object) {
        const TWITCH_EMBED = {}
    }

}