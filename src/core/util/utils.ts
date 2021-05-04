import {Message} from 'discord.js';

export class Help {
    static commands(msg: Message) {
        const embed = {
            color: 0x0099ff,
            title: 'Commands',
            description: 'A list of supported commands.',
            fields: [
                {
                    name: '!gb [game]',
                    value: 'Search for information about a specific game.',
                    inline: true
                },
                {
                    name: '!trivia',
                    value: 'Start a quick round of trivia.',
                    inline: true
                },
                {
                    name: '!top [genre]',
                    value: 'Get a list of top games in a specific genre.',
                    inline: true
                }
            ]
        }

        msg.channel.send({embed: embed});
    }
}