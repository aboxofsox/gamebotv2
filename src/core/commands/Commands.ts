import {Client, Message, Intents, CommandInteraction, Interaction, ApplicationCommandData, Guild} from 'discord.js';
import Embedder from '../embedder/Embedder';
import API from '../api/API.module';
import TopRated from '../top-rated/TopRated';
import TwitchController from '../twitch/twitch-controller';
import {CommandData} from './CommandData';

export default class Commands {
    private static client: Client;
    static __init(client: Client) {
        Commands.client = client;
        CommandData.map(cmd => client.application.commands.create(cmd));

        // Verify
        this.verify();
    }

    static async delete(command: string) {
        let commands = Commands.client.application.commands.fetch().then(cmd => cmd);

        (await commands).map(cmd => {
            if(cmd.name === command) {
                Commands.client.application.commands.delete(cmd.id);
            }
        })
    }

    private static verify() {
        this.client.application.commands.fetch().then(cmd => console.log(cmd));
    }

    static async onCommand(interaction: Interaction) {
        if(!interaction.isCommand()) return;

        switch(interaction.commandName) {
            case 'search':
                let data = await API.search(interaction.options[0].value.toString());
                data = data.redirect ? await API.redirect(data.slug) : await API.search(interaction.options[0].value.toString());
                Embedder.search(data, interaction);
                break;
            case 'top':
                let top = await TopRated.go(interaction.options[0].value.toString());
                Embedder.top(top, interaction.options[0].value.toString(), interaction);
                break;
            case 'twitch':
                break;

        }
    }
}