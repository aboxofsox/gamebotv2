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

        }
    ]
}

const pollData: ApplicationCommandData = {
    name: 'poll',
    description: 'Start a poll (max of 5)',
    options: [
        {
            name: 'message',
            type: 'STRING',
            description: 'Message',
            required: true
        },
        {
            name: 'option1',
            type: 'STRING',
            description: 'Option 1',
            required: true
        },
        {
            name: 'option2',
            type: 'STRING',
            description: 'Option 2',
            required: true
        },
        {
            name:'option3',
            type:'STRING',
            description: 'Option 3',
            required: false
        },
        {
            name: 'option4',
            type: 'STRING',
            description: 'Option 4',
            required: false
        },
        {
            name: 'option5',
            type: 'STRING',
            description: 'Option 5',
            required: false
        }
    ]
}

export const CommandData = [queryData, topData, twitchData, pollData];