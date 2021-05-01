import * as dotenv from 'dotenv';
import Main from './core/Main';
dotenv.config();

Main.init(process.env.DISCORD_TOKEN);
