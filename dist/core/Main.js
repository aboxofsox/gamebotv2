"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const API_module_1 = __importDefault(require("./api/API.module"));
const trivia_module_1 = __importDefault(require("./quiz/trivia.module"));
const TopRated_1 = __importDefault(require("./top-rated/TopRated"));
const twitch_controller_1 = __importDefault(require("./twitch/twitch-controller"));
const utils_1 = require("./util/utils");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
class Main {
    static init(token) {
        return __awaiter(this, void 0, void 0, function* () {
            Main.client = new discord_js_1.Client({ intents: [discord_js_1.Intents.FLAGS.GUILDS, discord_js_1.Intents.FLAGS.GUILD_MESSAGES] });
            Main.client.login(token);
            Main.client.once('ready', () => {
                console.log(`Logged in as ${Main.client.user.tag}`);
                this.cmdinit();
            });
            // Main.client.on('message', (msg: Message) => this.command(msg));
        });
    }
    static cmdinit() {
        const queryData = {
            name: 'search',
            description: 'Get video game information.',
            options: [{
                    name: 'query',
                    type: 'STRING',
                    description: 'Embeded game data.',
                    required: true,
                }]
        };
        const topData = {
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
        Main.client.on('interaction', (interaction) => this.cmdInt(interaction));
    }
    static cmdInt(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!interaction.isCommand())
                return;
            switch (interaction.commandName) {
                case 'search':
                    let data = yield API_module_1.default.search(interaction.options[0].value.toString());
                    data = data.redirect ? yield API_module_1.default.redirect(data.slug) : yield API_module_1.default.search(interaction.options[0].value.toString());
                    this.embed(data, null, interaction);
                    break;
                case 'top':
                    let top = yield TopRated_1.default.go(interaction.options[0].value.toString());
                    this.embedTop(top, null, interaction.options[0].value.toString(), interaction);
                    break;
            }
        });
    }
    static command(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            if (msg.content.indexOf('!') !== 0)
                return;
            const args = msg.content.slice('!'.length).trim().split(/ +/g);
            const command = args.shift().toLowerCase();
            switch (command) {
                case 'gb':
                    let query = args.join(' ');
                    let data = yield API_module_1.default.search(query);
                    data = data.redirect ? yield API_module_1.default.redirect(data.slug) : yield API_module_1.default.search(query);
                    this.client;
                    this.embed(data, msg);
                    break;
                case 'ping':
                    msg.channel.send('pong');
                    break;
                case 'trivia':
                    trivia_module_1.default.init(msg);
                    break;
                case 'top':
                    let genre = args.join(' ');
                    let top = yield TopRated_1.default.go(genre);
                    this.embedTop(top, msg, genre);
                    break;
                case 'twitch':
                    let streamer = args.join(' ');
                    let info = yield twitch_controller_1.default.isStreamLive(streamer);
                    console.log(info);
                    break;
                case 'help' || 'h':
                    utils_1.Help.commands(msg);
                    break;
            }
        });
    }
    static embed(data, msg, int) {
        return __awaiter(this, void 0, void 0, function* () {
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
            };
            // msg.channel.send({embed: embedGB});
            int.reply({ embeds: [embedGB] });
        });
    }
    static embedTop(data, msg, genre, int) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data.length <= 0)
                return msg.channel.send('Sorry buddy, I got nothing.😟');
            const embed = {
                color: 0x0099ff,
                title: `Top ${genre} Games`,
                description: `${data.map((item, i) => `${i + 1}. ${item.name} | ${(item.metacritic == null) ? 'NA' : item.metacritic},`).join('\n')}`
            };
            // msg.channel.send({embed: embed});
            int.reply({ embeds: [embed] });
        });
    }
}
exports.default = Main;
