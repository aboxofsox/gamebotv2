/**
 *  //todo: add checks for empty, null, or invalid API calls
 *  todo: add error embed to handle errorful messages
 *  //todo: add support for image_additional
 *  todo: unique server instances with configurable questions
 *  todo: LFG
 *  //todo: top rated games
 */


import * as dotenv from 'dotenv';
import Main from './core/Main';
dotenv.config();

Main.init(process.env.DISCORD_TOKEN);
