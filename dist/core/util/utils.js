"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Help = void 0;
class Help {
    static commands(msg) {
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
        };
        msg.channel.send({ embed: embed });
    }
}
exports.Help = Help;
