import fetch from 'node-fetch';
import dotenv from 'dotenv'
dotenv.config();

export default class TopRated {
    private static async get(query: string) {

        if(query.includes('rpg')) query = 'role-playing-games-rpg';
        if(query.includes('fps')) query = 'shooter';
        if(query.includes(' ')) query = query.replace(/ /g, '-');


        let games: object[] = [];
        const url = `https://api.rawg.io/api/games?genres=${query.toLowerCase()}&key=${process.env.RAWG_TOKEN}`
        const res = await fetch(url);
        const json = await res.json();

        json.results.slice(0, 10).map((i: any) => games.push({name: i.name, metacritic: i.metacritic}));

        return games.sort((a: any, b: any) => b.metacritic - a.metacritic);
    }

    private static sort(a: number, b: number) {
        return a - b;
    }

    static go(query: string) {
        return this.get(query);
    }
}