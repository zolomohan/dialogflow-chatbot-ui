//PURPOSE:  Information needed to access the api.ai bot, only thing needed to be changed
var accessToken = credentialsAccessToken,
	botName = credentialsBotName,
	baseUrl = credentialsBaseUrl,
	config = credentialsConfig;

firebase.initializeApp(config);

var newKey = firebase.database().ref(botName).push().key; // Key for this instance of the chat interface
console.log('Key for this chat instance = ' + newKey);

// PURPOSE: Variables to be used for storing the last message sent and recieved for the database
var lastSentMessage = '',
	lastRecievedMessage = 1,
	ButtonClicked = false;

const DEFAULT_TIME_DELAY = 300;

var $chatlogs = $('.chatlogs'), speechResponseActive = false;

$('document').ready(function() {
	$('#switchInputType').toggle(); // Hide the switch input type button initially
	$('#switchInputType').click(() => {
		// Toggle Alternate Input
		$('#switchInputType').toggleClass('fa-keyboard').toggleClass('fa-align-justify');
		$('textarea').toggle();
		$('.buttonResponse').toggle();
	});

	$('textarea').keypress(function(event) {
		// INFO: 13 stands for 'enter key'
		if (event.which === 13) {
			event.preventDefault(); // Prevent the default function of the enter key (Dont go to a new line)
			ButtonClicked = false;
			postUserResponseToAPI(this.value); // Send Message to AJAX Request Function
			$('.input').attr('rows', '1'); // reset the size of the text area
			this.value = ''; // Clear the text area
			if ($('#switchInputType').is(':visible')) {
				$('#switchInputType').toggle();
				$('.buttonResponse').remove();
			}
		}
	});

	$('#rec').click(switchRecognition); // If the user presses the button for voice input

	$('#speechResponse').click((function() {
		speechResponseActive = !speechResponseActive;
		$(this).toggleClass('fa-volume-mute').toggleClass('fa-volume-up')
	}))

	// If the user selects one of the dynamic button responses
	$('.chat-form').on('click', '.buttonResponse', function() {
		ButtonClicked = true;
		postUserResponseToAPI(this.innerText); // Send the text on the button as a user message
		$('textarea').toggle(); // Show text input area
		$('#switchInputType').hide();
		$('.buttonResponse').remove(); // Remove the button responses from the div
	});
});

function postUserResponseToAPI(text) {
	// PURPOSE: Method which takes the users text and sends an AJAX post request to API and recieves a response message from API
	// Create a new Chat Message Div with the text that the user typed in
	$chatlogs.append($('<div/>', { class: 'chat self' }).append($('<p/>', { class: 'chat-message', text: text })));
	scrollChatLog();
	lastSentMessage = text; // update the last message sent variable to be stored in the database
	storeMessageToDB();

	$.ajax({
		type        : 'POST',
		url         : baseUrl + 'query?v=20150910',
		contentType : 'application/json; charset=utf-8',
		dataType    : 'json',
		headers     : {
			Authorization : 'Bearer ' + accessToken
		},
		data        : JSON.stringify({ query: text, lang: 'en', sessionId: 'somerandomthing' }),
		success     : function(data) {
			parseResponse(JSON.stringify(data.result.fulfillment.speech, undefined, 2));
		},
		error       : function() {
			parseResponse('Internal Server Error');
		}
	});
}

function parseResponse(responseString) {
	/* PURPOSE: Method called whenver there is a new recieved message
		This method is called from the AJAX Response
		This method tells how the response must be rendered
		Splits between the button messages and single message 
	*/

	var removedQuotes = responseString.replace(/[""]/g, ''); // Remove Quotes from the String
	lastRecievedMessage = removedQuotes; // Update the last message recieved variable for storage in the database
	// If the message contains a <ar> then it is a message whose responses are buttons
	if (removedQuotes.includes('<ar')) {
		buttonResponse(removedQuotes);
	} else {
		showTypingIndicator();
		setTimeout(function() {
			createNewMessage(removedQuotes);
		}, DEFAULT_TIME_DELAY);
	}
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
	// Loop through each response and create a button
	for (var i = 0; i < buttonList.length; i++)
		listOfInputs.push(
			$('<div/>', { class: 'buttonResponse' }).append($('<p/>', { class: 'chat-message', text: buttonList[i] }))
		);

	showTypingIndicator();
	setTimeout(function() {
		$('textarea').toggle(); // Hide the text area
		$('#switchInputType').show(); // Show the switch input button
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

	showTypingIndicator();
	(function theLoop(listOfMessages, i, numMessages) {
		setTimeout(function() {
			createNewMessage(listOfMessages[i].text);
			if (i++ < numMessages - 1) {
				showTypingIndicator();
				theLoop(listOfMessages, i, numMessages); // Call the method again
			}
		}, listOfMessages[i].delay);
	})(listOfMessages, i, numMessages); // Pass the parameters back into the method
}

function createNewMessage(message) {
	// PURPOSE: Method to create a new div showing the text from API

	hideTypingIndicator();
	if(speechResponseActive === true)
	speechResponse(message); // take the message and say it back to the user.
	// Append a new div to the chatlogs body, with an image and the text from API
	$chatlogs.append(
		$('<div/>', { class: 'chat friend' }).append(
			$('<div/>', { class: 'bot-photo' }).append($('<img src="https://i.ibb.co/cDCL67q/bot.png" />')),
			$('<p/>', { class: 'chat-message', text: message })
		)
	);
	scrollChatLog();
}

function storeMessageToDB() {
	//PURPOSE: To store message to Databse
	var date = new Date();
	if (lastRecievedMessage == 1) {
		firebase.database().ref(botName).child(newKey).push({
			UserResponse : lastSentMessage,
			Time         : date + ''
		});
	} else {
		firebase.database().ref(botName).child(newKey).push({
			Question      : lastRecievedMessage,
			UserResponse  : lastSentMessage,
			ButtonClicked : ButtonClicked,
			Time          : date + ''
		});
	}
}

function showTypingIndicator() {
	$chatlogs.append($('#loadingGif'));
	$('#loadingGif').show();
}

function hideTypingIndicator() {
	$('.chat-form').css('visibility', 'visible');
	$('#loadingGif').hide();
}

function scrollChatLog() {
	// Scroll the view down a certain amount
	$chatlogs.stop().animate({ scrollTop: $chatlogs[0].scrollHeight });
}

//----------------------Voice Message Methods--------------------------------//

var voiceRecogntion;

function switchRecognition() {
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
	$('#rec').toggleClass('fa-microphone').toggleClass('fa-microphone-slash')
	$('#rec').hasClass('fa-microphone-slash') 
		?	$('textarea.input').attr('placeholder', 'Type a message')
		: $('textarea.input').attr('placeholder', 'Say Something...')
}

function speechResponse(message) {
	var msg = new SpeechSynthesisUtterance();
	msg.default = false;
	msg.voiceURI = 'Fiona';
	msg.name = 'Fiona';
	msg.localService = true;
	msg.text = message;
	msg.lang = 'en';
	msg.rate = 0.9;
	msg.volume = 1;
	window.speechSynthesis.speak(msg);
}

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
