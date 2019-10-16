import bot from '../../config/bot';
import random from '../randomFromArray';

const greeting = [ 'hello', 'hey', 'hey there', 'hello there' ];
const intro = [ 'my name is', 'i am' ]

export default [{
	texts: [`${random(greeting)}, ${random(intro)} ${bot.name} ! what would you like to know about?`],
	user: 'bot'
}];