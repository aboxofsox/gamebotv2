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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var API_module_1 = __importDefault(require("./api/API.module"));
var trivia_module_1 = __importDefault(require("./quiz/trivia.module"));
var TopRated_1 = __importDefault(require("./top-rated/TopRated"));
var twitch_controller_1 = __importDefault(require("./twitch/twitch-controller"));
var utils_1 = require("./util/utils");
var dotenv = __importStar(require("dotenv"));
var Embedder_1 = __importDefault(require("./embedder/Embedder"));
var Commands_1 = __importDefault(require("./commands/Commands"));
dotenv.config();
var Main = /** @class */ (function () {
    function Main() {
    }
    Main.init = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                Main.client = new discord_js_1.Client({ intents: [discord_js_1.Intents.FLAGS.GUILDS, discord_js_1.Intents.FLAGS.GUILD_MESSAGES] });
                Main.client.login(token);
                Main.client.once('ready', function () {
                    console.log("Logged in as " + Main.client.user.tag);
                    Commands_1.default.__init(Main.client);
                });
                Main.client.on('interaction', function (interaction) { return Commands_1.default.onCommand(interaction); });
                return [2 /*return*/];
            });
        });
    };
    Main.cmdinit = function () {
        // const queryData: ApplicationCommandData = {
        //     name: 'search',
        //     description: 'Get video game information.',
        //     options: [{
        //       name: 'query',
        //       type: 'STRING',
        //       description: 'Embeded game data.',
        //       required: true,
        //     }]
        // };
        // const topData: ApplicationCommandData = {
        //     name: 'top',
        //     description: 'Get top video games of a specific genre.',
        //     options: [{
        //         name: 'genre',
        //         type: 'STRING',
        //         description: 'Genre to pass to API.',
        //         required: true
        //     }]
        // };
        // const twitchData: ApplicationCommandData = {
        //     name: 'twitch',
        //     description: 'Get Twitch streamer information.',
        //     options: [
        //         {
        //             name: 'channel',
        //             type: 'STRING',
        //             description: 'Channel name of Twitch streamer.',
        //             required: true,
        //         },
        //         {
        //             name: 'query',
        //             type: 'STRING',
        //             description: 'Specific information',
        //             required: false
        //         }
        //     ]
        // };
        // [queryData, topData].map(cmd => Main.client.application.commands.create(cmd));
        // Main.client.on('interaction', (interaction: Interaction) => this.cmdInt(interaction))
    };
    Main.deleteCmd = function (command) {
        return __awaiter(this, void 0, void 0, function () {
            var commands;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        commands = Main.client.application.commands.fetch().then(function (cmd) { return cmd; });
                        return [4 /*yield*/, commands];
                    case 1:
                        (_a.sent()).map(function (cmd) {
                            if (cmd.name === command)
                                console.log([cmd.id, cmd.name]);
                            console.log(cmd);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.cmdInt = function (interaction) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, data, _b, top_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!interaction.isCommand())
                            return [2 /*return*/];
                        _a = interaction.commandName;
                        switch (_a) {
                            case 'search': return [3 /*break*/, 1];
                            case 'top': return [3 /*break*/, 7];
                        }
                        return [3 /*break*/, 9];
                    case 1: return [4 /*yield*/, API_module_1.default.search(interaction.options[0].value.toString())];
                    case 2:
                        data = _c.sent();
                        if (!data.redirect) return [3 /*break*/, 4];
                        return [4 /*yield*/, API_module_1.default.redirect(data.slug)];
                    case 3:
                        _b = _c.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, API_module_1.default.search(interaction.options[0].value.toString())];
                    case 5:
                        _b = _c.sent();
                        _c.label = 6;
                    case 6:
                        data = _b;
                        // this.embed(data, null, interaction);
                        Embedder_1.default.search(data, interaction);
                        return [3 /*break*/, 9];
                    case 7: return [4 /*yield*/, TopRated_1.default.go(interaction.options[0].value.toString())];
                    case 8:
                        top_1 = _c.sent();
                        // this.embedTop(top, null, interaction.options[0].value.toString(), interaction);
                        Embedder_1.default.top(top_1, interaction.options[0].value.toString(), interaction);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    Main.command = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            var args, command, _a, streamer, info;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (msg.content.indexOf('!') !== 0)
                            return [2 /*return*/];
                        args = msg.content.slice('!'.length).trim().split(/ +/g);
                        command = args.shift().toLowerCase();
                        _a = command;
                        switch (_a) {
                            case 'ping': return [3 /*break*/, 1];
                            case 'trivia': return [3 /*break*/, 2];
                            case 'twitch': return [3 /*break*/, 3];
                            case 'help' || 'h': return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 6];
                    case 1:
                        msg.channel.send('pong');
                        return [3 /*break*/, 6];
                    case 2:
                        trivia_module_1.default.init(msg);
                        return [3 /*break*/, 6];
                    case 3:
                        streamer = args.join(' ');
                        return [4 /*yield*/, twitch_controller_1.default.isStreamLive(streamer)];
                    case 4:
                        info = _b.sent();
                        console.log(info);
                        return [3 /*break*/, 6];
                    case 5:
                        utils_1.Help.commands(msg);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return Main;
}());
exports.default = Main;
