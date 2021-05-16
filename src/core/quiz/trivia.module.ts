import { Message, Collector } from 'discord.js';
import * as fs from 'fs';
import {Question} from '../../interfaces';

export default class Trivia {
    private static questions: any[];
    private static question: object;

    private static draw() {
        let json = fs.readFileSync(`${__dirname}/questions.json`);
        this.questions = Array.from(JSON.parse(json.toString()));
        let rand = Math.floor(Math.random() * this.questions.length);
        let q: Question = {
            q: this.questions[rand].question,
            a: this.questions[rand].answers
        }

        return q;
    }

    static init(msg: Message) {
        const question = this.draw();
        console.log(question);
        const filter = (response: Message) => question.a.toLowerCase() === response.content.toLowerCase();
        

        msg.channel.send(question.q)
            .then(() => msg.channel.awaitMessages(filter, {max: 1, time: 30000, errors:['time']}))
            .then(collected => {msg.channel.send(`${collected.first().author.username} got the answer right!`)})
            .catch(collected => msg.channel.send('Looks like nobody got the answer right.'));
    }
}