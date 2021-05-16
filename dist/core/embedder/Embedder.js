"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Embedder {
    static search(data, int) {
        return __awaiter(this, void 0, void 0, function* () {
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
            };
            int.reply({ embeds: [embedData] });
        });
    }
    static top(data, genre, int) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data.length <= 0)
                return int.reply('Sorry buddy, I got nothing. 😟');
            const embedData = {
                color: 0x0099ff,
                title: `Top ${genre} Games`,
                description: `${data.map((item, i) => `${i + 1}. ${item.name} | ${(item.metacritic == null) ? 'NA' : item.metacritic},`).join('\n')}`
            };
            int.reply({ embeds: [embedData] });
        });
    }
    static twitch(data, int) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data)
                return int.reply('Sorry buddy, I got nothing. 😟');
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
                thumbnail: { url: data.logo },
                image: { url: data.banner }
            };
            int.reply({ embeds: [embedData] });
        });
    }
}
exports.default = Embedder;
