"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
class Trivia {
    static getQuestions() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://opentdb.com/api.php?amount=50&category=15&difficulty=medium&type=multiple`;
            const res = yield fetch(url);
            const json = yield res.json();
        });
    }
    static draw() {
        let json = fs.readFileSync(`${__dirname}/questions.json`);
        this.questions = Array.from(JSON.parse(json.toString()));
        let rand = Math.floor(Math.random() * this.questions.length);
        let q = {
            q: this.questions[rand].question,
            a: this.questions[rand].answers
        };
        return q;
    }
    static init(msg) {
        const question = this.draw();
        console.log(question);
        const filter = (response) => question.a.toLowerCase() === response.content.toLowerCase();
        msg.channel.send(question.q)
            .then(() => msg.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] }))
            .then(collected => { msg.channel.send(`${collected.first().author.username} got the answer right!`); })
            .catch(collected => msg.channel.send('Looks like nobody got the answer right.'));
    }
}
exports.default = Trivia;
