"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandData = void 0;
const queryData = {
    name: 'search',
    description: 'Get video game information from API',
    options: [{
            name: 'query',
            type: 'STRING',
            description: 'Query for API',
            required: true
        }]
};
const topData = {
    name: 'top',
    description: 'Get top video games of a specific genre',
    options: [{
            name: 'genre',
            type: 'STRING',
            description: 'Genre to pass to API.',
            required: true
        }]
};
const twitchData = {
    name: 'twitch',
    description: 'Get Twitch streamer information.',
    options: [
        {
            name: 'channel',
            type: 'STRING',
            description: 'Channel of Twitch streamers.',
            required: true
        }
        // {
        //     name: 'query',
        //     type: 'STRING',
        //     description: 'Specific information',
        //     required: false
        // }
    ]
};
exports.CommandData = [queryData, topData, twitchData];
