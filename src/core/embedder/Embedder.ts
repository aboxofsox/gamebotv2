import { CommandInteraction, Interaction, ApplicationCommandData, CommandInteractionOption,} from 'discord.js';
import {GBData, TwichData} from '../../interfaces';



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
    
    static async twitch(data: TwichData, int: CommandInteraction) {
        if(!data) return int.reply('Sorry buddy, I got nothing. 😟');
        const embedData = {
            color: 0xBF99FF,
            title: `${data.name}'s Twitch Channel`,
            url: data.url,
            description: data.description,
            fields: [
                {
                    name: 'Status',
                    value: data.status,
                    inline: true,
                },
                {
                    name: 'Followers',
                    value: data.followers,
                    inline: true
                },
                {
                    name: 'Views',
                    value: data.views,
                    inline: true
                },
            ],
            thumbnail: {url: data.logo},
            image: {url: data.banner}
        }

        int.reply({embeds: [embedData]});

    }

    static async poll(options: CommandInteractionOption[], int: CommandInteraction) {
        if(!options) return int.reply(`Excuse me? 🤔`);
        let max = options.length - 1;
        const reactions = [
            `1️⃣`, `2️⃣`, `3️⃣`, 
            `4️⃣`, `5️⃣`, `6️⃣`, 
            `7️⃣`, `8️⃣`, `9️⃣`,
            `🔟`
        ];

        const embedData = {
            color: 0x45f542,
            title: options[0].value,
            // description: `${options.reduce((acc, cur, i) => cur.name !== 'message' ? [...acc, `${reactions[i - 1]} ${cur.value}`] : acc, []).join('\n \n')}`
            description: `${options.map((option, i) => {if (option.name !== 'message') return `${reactions[i - 1]} ${option.value}`}).join('\n \n')}`
        }

        int.reply({embeds: [embedData]})
        let id = int.id;
        int.fetchReply().then(async msg => {
            for(let i = 0; i < max; i++) {
                try {
                    await msg.react(reactions[i]);
                } catch(err) {
                    return err;
                }
            }
        });


        
    }
}