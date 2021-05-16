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
const node_fetch_1 = __importDefault(require("node-fetch"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class TopRated {
    static get(query) {
        return __awaiter(this, void 0, void 0, function* () {
            if (query.includes('rpg'))
                query = 'role-playing-games-rpg';
            if (query.includes('fps'))
                query = 'shooter';
            if (query.includes(' '))
                query = query.replace(/ /g, '-');
            let games = [];
            const url = `https://api.rawg.io/api/games?genres=${query.toLowerCase()}&key=${process.env.RAWG_TOKEN}`;
            const res = yield node_fetch_1.default(url);
            const json = yield res.json();
            json.results.slice(0, 10).map((i) => games.push({ name: i.name, metacritic: i.metacritic }));
            console.log(games.sort((a, b) => b.metacritic - a.metacritic));
            return games.sort((a, b) => b.metacritic - a.metacritic);
        });
    }
    static sort(a, b) {
        return a - b;
    }
    static go(query) {
        return this.get(query);
    }
}
exports.default = TopRated;
