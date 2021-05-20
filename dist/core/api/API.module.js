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
class API {
    static search(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://api.rawg.io/api/games/${query.replace(/ /g, '-')}?key=${process.env.RAWG_TOKEN}`;
            const res = yield node_fetch_1.default(url);
            const json = yield res.json();
            if (json.redirect) {
                return json;
            }
            ;
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
                reddit_name: json.reddit_name,
                developers: {
                    name: (json.developers.length <= 0) ? 'NA' : json.developers[0].name
                },
                publishers: {
                    name: (json.publishers.length <= 0) ? 'NA' : json.publishers[0].name
                }
            };
            return this.gbData;
        });
    }
    static redirect(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://api.rawg.io/api/games/${query}?key=${process.env.RAWG_TOKEN}`;
            const res = yield node_fetch_1.default(url);
            const json = yield res.json();
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
            };
            return this.gbData;
        });
    }
}
exports.default = API;
