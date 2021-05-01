import fetch from 'node-fetch';
import {GBData} from '../../interfaces';
import dotenv from 'dotenv';
dotenv.config();


export default class API {
    public static gbData: GBData;

    static async search(query: string) {
        const url = `https://api.rawg.io/api/games/${query.replace(/ /g, '-')}?key=${process.env.RAWG_TOKEN}`;
        const res = await fetch(url);
        const json = await res.json();

        console.log(json);

        // Fixme: is this necessary? 

        if(json.redirect) {
            return json;
        };

        this.gbData = {
            redirect: false,
            id: json.id,
            slug: json.slug,
            name: json.name,
            metacritic: json.metacritic,
            released: json.released,
            updated: json.updated,
            background_image: json.background_image,
            rating: json.rating,
            reddit_name: json.reddit_name, // ? field can be incorrect due to API
            developers: {
                name: (json.developers.length <= 0) ? 'NA' : json.developers[0].name
            },
            publishers: {
                name: (json.publishers.length <= 0) ? 'NA' : json.publishers[0].name
            }
        }

        return this.gbData;
        
    }
    static async redirect(query: string) {
        const url = `https://api.rawg.io/api/games/${query}?key=${process.env.RAWG_TOKEN}`;
        const res = await fetch(url);
        const json = await res.json();

        console.log(json);


        this.gbData = {
            redirect: true,
            id: json.id,
            slug: json.slug,
            name: json.name,
            metacritic: json.metacritic,
            released: json.released,
            updated: json.updated,
            background_image: json.background_image,
            rating: json.rating,
            reddit_name: json.reddit_name,
            developers: {
                name: (json.developers.length <= 0) ? 'NA' : json.developers[0].name
            },
            publishers: {
                name: (json.publishers.length <= 0) ? 'NA' : json.publishers[0].name
            }
        }

        return this.gbData;
    }
}