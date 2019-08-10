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
		ButtonClicked = false,
		DEFAULT_TIME_DELAY = 300;

// PURPOSE: Variable for the chatlogs div
var $chatlogs = $('.chatlogs');

$('document').ready(function() {
	$('#switchInputType').toggle(); // Hide the switch input type button initially
	$('#switchInputType').click(() => {
		// Toggle Alternate Input
		$('.buttonResponse').is(':visible')
			? $('#switchInputType').attr('src', 'Images/multipleChoice.png')
			: $('#switchInputType').attr('src', 'Images/keyboard.png');
		$('textarea').toggle();
		$('.buttonResponse').toggle();
	});

	$('textarea').keypress(function(event) {
		// INFO: 13 stands for 'enter key'
		if (event.which === 13) {
			event.preventDefault(); // Prevent the default function of the enter key (Dont go to a new line)
			ButtonClicked = false;
			send(this.value); // Call the method for sending a message, pass in the text from the user
			$('.input').attr('rows', '1'); // reset the size of the text area
			this.value = ''; // Clear the text area
			if ($('#switchInputType').is(':visible')) {
				$('#switchInputType').toggle();
				$('.buttonResponse').remove();
			}
		}
	});

	$('#rec').click(switchRecognition); // If the user presses the button for voice input

	// If the user selects one of the dynamic button responses
	$('.chat-form').on('click', '.buttonResponse', function() {
		ButtonClicked = true;
		send(this.innerText); // Send the text on the button as a user message
		$('textarea').toggle(); // Show the record button and text input area
		// Hide the button responses and the switch input button
		$('.buttonResponse').toggle();
		$('#switchInputType').hide();
		$('.buttonResponse').remove(); // Remove the button responses from the div
	});
});

function send(text) {
	// PURPOSE: Method which takes the users text and sends an AJAX post request to API.AI and recieves a response message from API.AI
	// Create a new Chat Message Div with the text that the user typed in
	$chatlogs.append($('<div/>', { class: 'chat self' }).append($('<p/>', { class: 'chat-message', text: text })));
	var $sentMessage = $('.chatlogs .chat').last();
	checkVisibility($sentMessage);
	lastSentMessage = text; // update the last message sent variable to be stored in the database and store in database
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
			console.log("AJAX Success : ");
			console.log(data)
			newRecievedMessage(JSON.stringify(data.result.fulfillment.speech, undefined, 2));
		},
		error       : function() {
			newRecievedMessage('Internal Server Error');
		}
	});
}

function newRecievedMessage(messageText) {
	/* PURPOSE: Method called whenver there is a new recieved message
		This message comes from the AJAX request sent to API.AI
		This method tells which type of message is to be sent
		Splits between the button messages, multi messages and single message 
	*/

	var removedQuotes = messageText.replace(/[""]/g, ''); // Remove Quotes from the String
	lastRecievedMessage = removedQuotes; // Update the last message recieved variable for storage in the database
	// If the message contains a <ar> then it is a message whose responses are buttons
	if (removedQuotes.includes('<ar')) {
		buttonResponse(removedQuotes);
	}  else {
		showLoading(); // Show the typing indicator
		setTimeout(function() {
			createNewMessage(removedQuotes);
		}, DEFAULT_TIME_DELAY);
	}
}

function multiMessage(message) {
	/* Method which takes messages and splits them based off a the delimeter <br 2500>
 		The integer in the delimeter is optional and represents the time delay in milliseconds
		 if the delimeter is not there then the time delay is set to the default 
	*/
	console.log('br')	
	// Stores the matches in the message, which match the regex
	var matches;

	// List of message objects, each message will have a text and time delay
	var listOfMessages = [];

	// Regex used to find time delay and text of each message
	var regex = /\<br(?:\s+?(\d+))?\>(.*?)(?=(?:\<br(?:\s+\d+)?\>)|$)/g;

	// While matches are still being found in the message
	while ((matches = regex.exec(message))) {
		// if the time delay is undefined(empty) use the default time delay
		if (matches[1] == undefined) {
			matches[1] = DEFAULT_TIME_DELAY;
		}

		// Create an array of the responses which will be buttons
		var messageText = matches[2].split(/<ar>/);

		// Create a message object and add it to the list of messages
		listOfMessages.push({
			text  : messageText[0],
			delay : matches[1]
		});
	}

	// loop index
	var i = 0;

	// Variable for the number of messages
	var numMessages = listOfMessages.length;

	// Show the typing indicator
	showLoading();

	// Function which calls the method createNewMessage after waiting on the message delay
	(function theLoop(listOfMessages, i, numMessages) {
		// Method which executes after the timedelay
		setTimeout(function() {
			// Create a new message from the server
			createNewMessage(listOfMessages[i].text);

			// If there are still more messages
			if (i++ < numMessages - 1) {
				// Show the typing indicator
				showLoading();

				// Call the method again
				theLoop(listOfMessages, i, numMessages);
			}
		}, listOfMessages[i].delay);

		// Pass the parameters back into the method
	})(listOfMessages, i, numMessages);
}


function buttonResponse(message) {
	/*Method called whenever an <ar> tag is found
		The responses for this type of message will be buttons
		This method parses out the time delays, message text and button responses
		Then creates a new message with the time delay and creates buttons for the responses
		Stores the matches in the message, which match the regex 
	*/
	var matches;

	// Used to store the new HTML div which will be the button
	var $input;

	// send the message to the multi message method to split it up, message will be sent here
	multiMessage(message);

	// Regex used to find time delay, text of the message and responses to be buttons
	var regex = /\<br(?:\s+?(\d+))?\>(.*?)(?=(?:\<ar(?:\s+\d+)?\>)|$)/g;

	// Seach the message and capture the groups which match the regex
	matches = regex.exec(message);

	console.log(matches);

	// Create an array of the responses which will be buttons
	var buttonList = message.split(/<ar>/);

	// Remove the first element, The first split is the actual message
	buttonList = buttonList.splice(1);

	console.log(buttonList);

	// Array which will store all of the newly created buttons
	var listOfInputs = [];

	// Loop through each response and create a button
	for (var index = 0; index < buttonList.length; index++) {
		// Store the current button response
		var response = buttonList[index];

		// Create a new div element with the text for the current button response
		$input = $('<div/>', { class: 'buttonResponse' }).append($('<p/>', { class: 'chat-message', text: response }));

		// add the new button to the list of buttons
		listOfInputs.push($input);
	}

	// Show the typing indicator
	showLoading();

	// After the time delay call the createNewMessage function
	setTimeout(function() {
		// Hide the send button and the text area
		// $('#rec').toggle();
		$('textarea').toggle();

		// Show the switch input button
		$('#switchInputType').show();

		// For each of the button responses
		for (var index = 0; index < listOfInputs.length; index++) {
			// Append to the chat-form div which is at the bottom of the chatbox
			listOfInputs[index].appendTo($('#buttonDiv'));
		}
	}, matches[1]);
}

// Method to create a new div showing the text from API.AI
function createNewMessage(message) {
	// Hide the typing indicator
	hideLoading();

	// take the message and say it back to the user.
	//speechResponse(message);

	// // Show the send button and the text area
	// $('#rec').css('visibility', 'visible');
	// $('textarea').css('visibility', 'visible');

	// Append a new div to the chatlogs body, with an image and the text from API.AI
	$chatlogs.append(
		$('<div/>', { class: 'chat friend' }).append(
			$('<div/>', { class: 'user-photo' }).append($('<img src="Images/jit.png" />')),
			$('<p/>', { class: 'chat-message', text: message })
		)
	);

	// Find the last message in the chatlogs
	var $newMessage = $('.chatlogs .chat').last();

	// Call the method to see if the message is visible
	checkVisibility($newMessage);
}

//------------------------------------------- Database Write --------------------------------------------------//

function storeMessageToDB() {
	var date = new Date();
	console.log(date);
	if (lastRecievedMessage == 1) {
		var storeMessage = firebase.database().ref(botName).child(newKey).push({
			UserResponse : lastSentMessage,
			Time         : date + ''
		});
	} else {
		var storeMessage = firebase.database().ref(botName).child(newKey).push({
			Question      : lastRecievedMessage,
			UserResponse  : lastSentMessage,
			ButtonClicked : ButtonClicked,
			Time          : date + ''
		});
	}
}

// Funtion which shows the typing indicator
// As well as hides the textarea and send button
function showLoading() {
	$chatlogs.append($('#loadingGif'));
	$('#loadingGif').show();

	// $('#rec').css('visibility', 'hidden');
	// $('textarea').css('visibility', 'hidden');

	$('.chat-form').css('visibility', 'hidden');
}

// Function which hides the typing indicator
function hideLoading() {
	$('.chat-form').css('visibility', 'visible');
	$('#loadingGif').hide();

	// Clear the text area of text
	$('.input').val('');

	// reset the size of the text area
	$('.input').attr('rows', '1');
}

// Method which checks to see if a message is in visible
function checkVisibility(message) {
	// Scroll the view down a certain amount
	$chatlogs.stop().animate({ scrollTop: $chatlogs[0].scrollHeight });
}

//----------------------Voice Message Methods--------------------------------//
//Voice stuff
var recognition;

function startRecognition() {
	console.log('Start');
	recognition = new webkitSpeechRecognition();

	recognition.onstart = function(event) {
		console.log('Update');
		updateRec();
	};

	recognition.onresult = function(event) {
		var text = '';

		for (var i = event.resultIndex; i < event.results.length; ++i) {
			text += event.results[i][0].transcript;
		}

		setInput(text);
		stopRecognition();
	};

	recognition.onend = function() {
		stopRecognition();
	};

	recognition.lang = 'en-US';
	recognition.start();
}

function stopRecognition() {
	if (recognition) {
		console.log('Stop Recog');
		recognition.stop();
		recognition = null;
	}
	updateRec();
}

function switchRecognition() {
	if (recognition) {
		console.log(' Stop if');
		stopRecognition();
	} else {
		startRecognition();
	}
}

function setInput(text) {
	$('.input').val(text);

	send(text);

	$('.input').val('');
}

function updateRec() {
	if (recognition) {
		$('#rec').attr('src', 'Images/MicrophoneOff.png');
	} else {
		$('#rec').attr('src', 'Images/microphone.png');
	}
}

function speechResponse(message) {
	var msg = new SpeechSynthesisUtterance();

	// These lines list all of the voices which can be used in speechSynthesis
	//var voices = speechSynthesis.getVoices();
	//console.log(voices);

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

//----------------------------------------- Resize the textarea ------------------------------------------//
$(document)
	.one('focus.input', 'textarea.input', function() {
		var savedValue = this.value;
		this.value = '';
		this.baseScrollHeight = this.scrollHeight;
		this.value = savedValue;
	})
	.on('input.input', 'textarea.input', function() {
		var minRows = this.getAttribute('data-min-rows') | 0,
			rows;
		this.rows = minRows;
		rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 17);
		this.rows = minRows + rows;
	});
