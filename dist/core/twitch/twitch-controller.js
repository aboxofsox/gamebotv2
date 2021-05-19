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
const twitch_1 = require("twitch");
const twitch_auth_1 = require("twitch-auth");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class TwitchAPI {
    static authenticate() {
        const clientID = process.env.TWITCH_CLIENT_ID;
        const accessToken = process.env.TWITCH_TOKEN;
        const authProvider = new twitch_auth_1.StaticAuthProvider(clientID, accessToken);
        this.client = new twitch_1.ApiClient({ authProvider: authProvider });
        console.log(this.client.clientId);
    }
    static __init(username) {
        return __awaiter(this, void 0, void 0, function* () {
            this.authenticate();
            this.user = yield this.client.helix.users.getUserByName(username);
            if (!this.user)
                return false;
            return (yield this.client.helix.streams.getStreamByUserId(this.user.id)) !== null;
        });
    }
    static getUserId(username) {
        return __awaiter(this, void 0, void 0, function* () {
            this.authenticate();
            this.user = yield this.client.helix.users.getUserByName(username);
            return this.user.id;
        });
    }
    static getChannel(username, query, int) {
        return __awaiter(this, void 0, void 0, function* () {
            this.authenticate();
            if (!query)
                query == 'all';
            let userid = yield this.client.helix.users.getUserByName(username).then(user => user.id);
            const channel = yield this.client.kraken.channels.getChannel(userid).then(data => data);
            let channelData = {
                name: channel.displayName,
                description: channel.description,
                url: channel.url,
                status: channel.status,
                followers: channel.followers,
                views: channel.views,
                logo: channel.logo,
                banner: channel.profileBanner,
            };
            return channelData;
        });
    }
}
exports.default = TwitchAPI;
