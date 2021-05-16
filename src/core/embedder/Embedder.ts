import { CommandInteraction, Interaction, ApplicationCommandData} from 'discord.js';
import {GBData} from '../../interfaces';



export default class Embedder {
    static async search(data: GBData, int: CommandInteraction) {
        const embedData = {
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
                    vaue: data.updated,
                    inline: true
                },
                {
                    name: 'Metacritic',
                    value: (data.metacritic == null) ? 'NA' : data.metacritic.toString(),
                    inline: true
                },
                {
                    name: 'Reddit',
                    value: (data.reddit_name.length <= 0) ? 'NA' : data.reddit_name
                }
            ],
            thumbnail: {
                url: data.background_image
            }
        }

        int.reply({embeds: [embedData]});
    }

    static async top(data: object[], genre: string, int: CommandInteraction) {
        if(data.length <= 0) return int.reply('Sorry buddy, I got nothing. 😟');

        const embedData = {
            color: 0x0099ff,
            title: `Top ${genre} Games`,
            description: `${data.map((item: any, i: number) => `${i + 1}. ${item.name} | ${(item.metacritic == null) ? 'NA' : item.metacritic},`).join('\n')}`
        }

        int.reply({embeds: [embedData]});
    }
}