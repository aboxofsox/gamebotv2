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
class TwitchController {
    static authenticate() {
        const clientID = `ezzvzx6jn4hu2nj0l6r4srrm8uchzl`;
        const accessToken = `j364xnw33arvca6e69c8ln4zxyo1dv`;
        const authProvider = new twitch_auth_1.StaticAuthProvider(clientID, accessToken);
        this.client = new twitch_1.ApiClient({ authProvider: authProvider });
        console.log(this.client.clientId);
    }
    static getChannel(username) {
    }
    static isStreamLive(username) {
        return __awaiter(this, void 0, void 0, function* () {
            this.authenticate();
            const user = yield this.client.helix.users.getUserByName(username);
            const channel = yield this.client.helix.channels.getChannelInfo(user);
            console.log(channel.name);
            let userData = {
                name: user.displayName,
                description: user.description,
                type: user.broadcasterType,
                pfp: user.profilePictureUrl,
            };
            console.log(userData);
            // console.log([user.displayName, user.description, user.broadcasterType, user.profilePictureUrl]);
            if (!user) {
                return false;
            }
            return (yield user.getStream()) !== null;
        });
    }
    static getUserInfo(username) {
        return __awaiter(this, void 0, void 0, function* () {
            this.authenticate();
            const user = yield this.client.helix.users.getUserByName(username);
            // console.log(userData);
        });
    }
}
exports.default = TwitchController;
