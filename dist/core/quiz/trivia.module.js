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
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var Trivia = /** @class */ (function () {
    function Trivia() {
    }
    Trivia.draw = function () {
        var json = fs.readFileSync(__dirname + "/questions.json");
        this.questions = Array.from(JSON.parse(json.toString()));
        var rand = Math.floor(Math.random() * this.questions.length);
        var q = {
            q: this.questions[rand].question,
            a: this.questions[rand].answers
        };
        return q;
    };
    Trivia.init = function (msg) {
        var question = this.draw();
        console.log(question);
        var filter = function (response) { return question.a.toLowerCase() === response.content.toLowerCase(); };
        msg.channel.send(question.q)
            .then(function () { return msg.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] }); })
            .then(function (collected) { msg.channel.send(collected.first().author.username + " got the answer right!"); })
            .catch(function (collected) { return msg.channel.send('Looks like nobody got the answer right.'); });
    };
    return Trivia;
}());
exports.default = Trivia;
