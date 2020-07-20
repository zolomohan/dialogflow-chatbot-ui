import bot from '../../config/bot';
import random from '../randomFromArray';

const greeting = [ 'hello', 'hey', 'hey there', 'hello there' ];

export default [{
	texts: [`${random(greeting)}, I'm ${bot.name}`],
	user: 'bot'
}];