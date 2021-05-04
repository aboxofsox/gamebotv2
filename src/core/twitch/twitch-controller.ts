import {ApiClient} from 'twitch';
import {StaticAuthProvider} from 'twitch-auth';

export default class TwitchController {
    private static client: ApiClient;
    private static authProvider: StaticAuthProvider;

    private static authenticate() {
        const clientID = process.env.TWITCH_CLIENT_ID;
        const accessToken = process.env.TWITCH_TOKEN;

        this.authProvider = new StaticAuthProvider(clientID, accessToken);
        this.client = new ApiClient({authProvider: this.authProvider});
    }

    public static async isStreamLive(username: string) {
        this.authenticate();
        const user: any = this.client.helix.users.getUserByName(username);
        if(!user) {
            return false;
        }
        return await this.client.helix.streams.getStreamByUserId(user.id) !== null;
    }
}