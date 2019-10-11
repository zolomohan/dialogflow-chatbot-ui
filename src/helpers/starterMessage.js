import bot from '../config/bot';

const random = (array) => array[Math.floor(Math.random() * array.length)];
const greeting = [ 'hello', 'hey' ];

export default {
	text: `${random(greeting)}, my name is ${bot.name} ! what whould you like to know about?`,
	user: 'bot'
};