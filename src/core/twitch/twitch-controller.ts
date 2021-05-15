import {ApiClient, HelixUser, HelixChannel} from 'twitch';
import {StaticAuthProvider} from 'twitch-auth';
import dotenv from 'dotenv';
dotenv.config();

export default class TwitchController {
    private static client: ApiClient;
    private static authProvider: StaticAuthProvider;

    private static authenticate() {
        const clientID = `ezzvzx6jn4hu2nj0l6r4srrm8uchzl`;
        const accessToken = `j364xnw33arvca6e69c8ln4zxyo1dv`;

        const authProvider = new StaticAuthProvider(clientID, accessToken);
        this.client = new ApiClient({authProvider: authProvider});

        console.log(this.client.clientId);
    }

    private static getChannel(username: string) {
    }

    public static async isStreamLive(username: string) {
        this.authenticate();
        const user = await this.client.helix.users.getUserByName(username);
        const channel = await this.client.helix.channels.getChannelInfo(user);
        console.log(channel.name);
        let userData = {
            name: user.displayName,
            description: user.description,
            type: user.broadcasterType,
            pfp: user.profilePictureUrl,
        }
        console.log(userData);
        
        // console.log([user.displayName, user.description, user.broadcasterType, user.profilePictureUrl]);
        if(!user) {
            return false;
        }
        return await user.getStream() !== null;
    }

    public static async getUserInfo(username: string) {
        this.authenticate();
        const user = await this.client.helix.users.getUserByName(username);

        

        // console.log(userData);

    }
}