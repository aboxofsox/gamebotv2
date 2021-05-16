import {ApiClient, HelixUser, HelixChannel, HelixStream, Channel} from 'twitch';
import {StaticAuthProvider} from 'twitch-auth';
import { Interaction } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

export default class TwitchAPI {
    private static client: ApiClient;
    private static authProvider: StaticAuthProvider;
    private static user: HelixUser;
    private static channel: Channel;

    private static authenticate() {
        const clientID = `ezzvzx6jn4hu2nj0l6r4srrm8uchzl`;
        const accessToken = `j364xnw33arvca6e69c8ln4zxyo1dv`;

        const authProvider = new StaticAuthProvider(clientID, accessToken);
        this.client = new ApiClient({authProvider: authProvider});

        console.log(this.client.clientId);
    }


    public static async __init(username: string) {
        this.authenticate();
        this.user = await this.client.helix.users.getUserByName(username);

        if(!this.user) return false;
        return await this.client.helix.streams.getStreamByUserId(this.user.id) !== null;

    }

    private static async getUserId(username: string) {
        this.authenticate();
        this.user = await this.client.helix.users.getUserByName(username);

        return this.user.id;
    }

    static async getChannel(username: string, query?: string, int?: Interaction) {
        this.authenticate();
        if(!query) query == 'all';
        let userid = await this.client.helix.users.getUserByName(username).then(user => user.id);
        const channel = await this.client.kraken.channels.getChannel(userid).then(data => data);

        let channelData = {
            name: channel.displayName,
            description: channel.description,
            url: channel.url,
            status: channel.status,
            followers: channel.followers,
            views: channel.views,
            logo: channel.logo,
            banner: channel.profileBanner,
        }

        return channelData;
    }
}