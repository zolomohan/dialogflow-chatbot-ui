//PURPOSE:  Information needed to access the api.ai bot, only thing needed to be changed
import { accessToken, baseUrl } from './accessToken.js';

const DEFAULT_TIME_DELAY = 300;

var chatLogs = $('#chatLogs');

//Speech Response Related Variables
var speechResponseActive = true,
	speechSynthesisInstance,
	voice;

//Toggle Chat Box
$('.chatToggle').click(() => $('#chatBox').slideToggle(() => $('textarea.input').focus()));

$('document').ready(function() {
	$('textarea.input').keypress(function(event) {
		// INFO: 13 stands for 'enter key'
		if (event.which === 13) {
			event.preventDefault(); // Prevent the default function of the enter key (Dont go to a new line)
			renderChatText(this.value, 'self');
			postUserResponseToAPI(this.value); // Send Message to AJAX Request Function
			$('.input').attr('rows', '1'); // reset the size of the text area
			this.value = ''; // Clear the text area
		}
	});

	$('#speechInput').click(switchVoiceRecognition); // If the user presses the button for voice input

	$('#speechResponse').click(function() {
		speechResponseActive = !speechResponseActive;
		if (!speechResponseActive) window.speechSynthesis.cancel();
		$(this).toggleClass('fa-volume-mute').toggleClass('fa-volume-up');
	});

	// If the user selects one of the suggestions
	$('#chatForm').on('click', '.buttonResponse', function() {
		renderChatText(this.innerText, 'self');
		postUserResponseToAPI(this.innerText);
		$('.buttonResponse').remove();
	});

	window.speechSynthesis.onvoiceschanged = () => {
		voice = window.speechSynthesis.getVoices()[4];
	};
});

//Resize the TextArea
$(document)
	.one('focus.input', 'textarea.input', function() {
		var savedValue = this.value;
		this.baseScrollHeight = this.scrollHeight;
		this.value = savedValue;
	})
	.on('input.input', 'textarea.input', function() {
		var minRows = this.getAttribute('data-min-rows') | 0,
			rows;
		this.rows = minRows;
		rows = Math.floor((this.scrollHeight - this.baseScrollHeight) / 17);
		this.rows = minRows + rows;
	});

function postUserResponseToAPI(text) {
	// PURPOSE: Method which takes the users text and sends an AJAX post request to API and recieves a response message from API
	$.ajax({
		type        : 'POST',
		url         : baseUrl,
		contentType : 'application/json; charset=utf-8',
		dataType    : 'json',
		headers     : {
			Authorization : 'Bearer ' + accessToken
		},
		data        : JSON.stringify({ query: text, lang: 'en', sessionId: 'somerandomthing' }),
		success     : (data) => parseResponse(JSON.stringify(data.result.fulfillment.speech, undefined, 2)),
		error       : () => parseResponse('Server Error')
	});
}

function parseResponse(responseString) {
	/* PURPOSE: Method called whenver there is a new recieved message
		This method is called from the AJAX Response
		This method tells how the response must be rendered
		Splits between the button messages and single message 
	*/

	var removedQuotes = responseString.replace(/[""]/g, ''); // Remove Quotes from the String
	if (removedQuotes.includes('<ar')) buttonResponse(removedQuotes);
	else if (removedQuotes.includes('<br')) setTimeout(() => chatResponse(removedQuotes), DEFAULT_TIME_DELAY);
	else renderChatText(removedQuotes, 'bot');
}

function buttonResponse(message) {
	/*	Method called whenever an <ar> tag is found
			The responses rendered for this type of message will be buttons
			This method parses out the time delays, message text and button responses
			Then creates a new message with the time delay and creates buttons for the responses
			Stores the matches in the message, which match the regex 
	*/
	chatResponse(message); // Send the message to multiMessage to Render Chat Message
	let buttonList = message.split(/<ar>/).splice(1); // Remove the first element, The first split is the Message replied to bes displayed on the chat

	var listOfInputs = [];
	$('.buttonResponse').remove();
	// Loop through each response and create a button
	for (let button of buttonList)
		listOfInputs.push(
			$('<div/>', { class: 'buttonResponse' }).append($('<p/>', { class: 'chat-message', text: button }))
		);

	setTimeout(() => {
		for (let button of listOfInputs) button.appendTo($('#buttonDiv'));
	}, DEFAULT_TIME_DELAY);
}

function chatResponse(message) {
	/* PURPOSE: Method which takes messages and splits them based off a the delimeter <br 2500>
 		 The integer in the delimeter is optional and represents the time delay in milliseconds
		 if the delimeter is not there then the time delay is set to the default 
	*/

	var matches, // Stores the matches in the message, which match the regex
		listOfMessages = [], // List of message objects
		regex = /\<br(?:\s+?(\d+))?\>(.*?)(?=(?:\<br(?:\s+\d+)?\>)|$)/g; // Regex used to find time delay and text of each message

	// While matches are still being found in the message
	while ((matches = regex.exec(message))) {
		if (matches[1] === undefined) matches[1] = DEFAULT_TIME_DELAY;
		var messageText = matches[2].split(/<ar>/);
		listOfMessages.push({
			text  : messageText[0],
			delay : matches[1]
		});
	}

	var i = 0,
		numMessages = listOfMessages.length;

	(function theLoop(listOfMessages, i, numMessages) {
		setTimeout(() => {
			renderChatText(listOfMessages[i].text, 'bot');
			if (i++ < numMessages - 1) {
				showTypingIndicator();
				theLoop(listOfMessages, i, numMessages); // Call the method again
			}
		}, listOfMessages[i].delay);
	})(listOfMessages, i, numMessages); // Pass the parameters back into the method
}

function renderChatText(message, user) {
	// PURPOSE: Method to create a new div showing the text from API
	scrollChatLog();
	hideTypingIndicator();
	if (user === 'bot') {
		if (speechResponseActive) speechResponse(message);
		chatLogs.append(
			$('<div/>', { class: `chat ${user}` }).append(
				$('<div/>', { class: 'botImg' }).append($('<img src="https://i.ibb.co/cDCL67q/bot.png" />')),
				$('<p/>', { class: 'chat-message', text: message })
			)
		);
	} else {
		chatLogs.append($('<div/>', { class: `chat ${user}` }).append($('<p/>', { class: 'chat-message', text: message })));
	}
}

function showTypingIndicator() {
	chatLogs.append($('#typingIndicator'));
	$('#typingIndicator').show();
	scrollChatLog();
}

function hideTypingIndicator() {
	$('#chatForm').css('visibility', 'visible');
	$('#typingIndicator').hide();
}

function scrollChatLog() {
	chatLogs.stop().animate({ scrollTop: chatLogs[0].scrollHeight });
}

//----------------------Voice Message Methods--------------------------------//

var voiceRecogntion;

function switchVoiceRecognition() {
	voiceRecogntion ? stopVoiceRecognition() : startVoiceRecognition();
}

function startVoiceRecognition() {
	voiceRecogntion = new webkitSpeechRecognition();
	voiceRecogntion.onstart = updateRecIcon;
	voiceRecogntion.onresult = function(event) {
		var text = '';
		for (var i = event.resultIndex; i < event.results.length; ++i) text += event.results[i][0].transcript;
		postUserResponseToAPI(text);
		stopVoiceRecognition();
	};
	voiceRecogntion.onend = stopVoiceRecognition;
	voiceRecogntion.lang = 'en-US';
	voiceRecogntion.start();
}

function stopVoiceRecognition() {
	if (voiceRecogntion) {
		voiceRecogntion.stop();
		voiceRecogntion = null;
	}
	updateRecIcon();
}

function updateRecIcon() {
	$('#speechInput').toggleClass('fa-microphone').toggleClass('fa-microphone-slash');
	$('#speechInput').hasClass('fa-microphone-slash')
		? $('textarea.input').attr('placeholder', 'Type a message')
		: $('textarea.input').attr('placeholder', 'Say Something...');
	if ($('.buttonResponse').is(':visible')) {
		$('.buttonResponse').remove();
		$('textarea.input').toggle();
	}
}

function speechResponse(message) {
	speechSynthesisInstance = new SpeechSynthesisUtterance();
	speechSynthesisInstance.default = false;
	speechSynthesisInstance.voice = voice;
	speechSynthesisInstance.localService = true;
	speechSynthesisInstance.text = message;
	speechSynthesisInstance.lang = 'en';
	speechSynthesisInstance.rate = 1;
	speechSynthesisInstance.volume = 1;
	speechSynthesisInstance.pitch = 1;
	window.speechSynthesis.speak(speechSynthesisInstance);
}
