"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MessageEmbeder {
    topEmbed(data, msg, genre) {
        if (data.length <= 0)
            return msg.channel.send(`Sorry buddy, I got nothing. 😞`);
        const TOP_EMBED = {
            color: 0x0099ff,
            title: `Top ${genre} Games`,
            description: `${data.map((item, i) => `${i + 1}. ${item.name} | ${(item.metacritic == null) ? 'NA' : item.metacritic},`).join('\n')}`
        };
        msg.channel.send({ embed: TOP_EMBED });
    }
    gameEmbed(msg, data) {
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
        };
        msg.channel.send({ embed: GAME_EMBED });
    }
    helpEmbed(msg) {
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
        };
        msg.channel.send({ embed: HELP_EMBED });
    }
    twitchEmbed(msg, data) {
        const TWITCH_EMBED = {};
    }
}
exports.default = MessageEmbeder;
