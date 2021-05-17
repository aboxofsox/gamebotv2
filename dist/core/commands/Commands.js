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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Embedder_1 = __importDefault(require("../embedder/Embedder"));
const API_module_1 = __importDefault(require("../api/API.module"));
const TopRated_1 = __importDefault(require("../top-rated/TopRated"));
const twitch_controller_1 = __importDefault(require("../twitch/twitch-controller"));
const CommandData_1 = require("./CommandData");
class Commands {
    static __init(client) {
        Commands.client = client;
        // CommandData.map(cmd => client.application.commands.create(cmd));
        CommandData_1.CommandData.map(cmd => this.delete(cmd.name));
        CommandData_1.CommandData.map(cmd => client.guilds.cache.get('656355090118213642').commands.create(cmd));
        CommandData_1.CommandData.map(cmd => client.guilds.cache.get('282009242867728384').commands.create(cmd));
        // Verify
        this.verify();
    }
    static delete(command) {
        return __awaiter(this, void 0, void 0, function* () {
            let commands = Commands.client.application.commands.fetch().then(cmd => cmd);
            (yield commands).map(cmd => {
                if (cmd.name === command) {
                    Commands.client.application.commands.delete(cmd.id);
                }
            });
        });
    }
    static verify() {
        this.client.application.commands.fetch().then(cmd => console.log(cmd));
    }
    static onCommand(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!interaction.isCommand())
                return;
            switch (interaction.commandName) {
                case 'search':
                    let data = yield API_module_1.default.search(interaction.options[0].value.toString());
                    data = data.redirect ? yield API_module_1.default.redirect(data.slug) : yield API_module_1.default.search(interaction.options[0].value.toString());
                    Embedder_1.default.search(data, interaction);
                    break;
                case 'top':
                    let top = yield TopRated_1.default.go(interaction.options[0].value.toString());
                    Embedder_1.default.top(top, interaction.options[0].value.toString(), interaction);
                    break;
                case 'twitch':
                    let twitchData = yield twitch_controller_1.default.getChannel(interaction.options[0].value.toString());
                    Embedder_1.default.twitch(twitchData, interaction);
                    break;
                case 'poll':
                    let options = interaction.options.values;
                    Embedder_1.default.poll(interaction.options, interaction);
            }
        });
    }
}
exports.default = Commands;
