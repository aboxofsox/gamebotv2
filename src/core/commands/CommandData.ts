import {ApplicationCommandData} from 'discord.js';

const queryData: ApplicationCommandData = {
    name: 'search',
    description: 'Get video game information from API',
    options: [{
        name: 'query',
        type: 'STRING',
        description: 'Query for API',
        required: true
    }]
}

const topData: ApplicationCommandData = {
    name: 'top',
    description: 'Get top video games of a specific genre',
    options: [{
        name: 'genre',
        type: 'STRING',
        description: 'Genre to pass to API.',
        required: true
    }]
}

const twitchData: ApplicationCommandData = {
    name: 'twitch',
    description: 'Get Twitch streamer information.',
    options: [
        {
            name: 'channel',
            type: 'STRING',
            description: 'Channel of Twitch streamers.',
            required: true

        },
        {
            name: 'query',
            type: 'STRING',
            description: 'Specific information',
            required: false

        }
    ]
}

export const CommandData = [queryData, topData, twitchData];