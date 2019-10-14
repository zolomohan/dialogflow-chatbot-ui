export default function parse(res) {
	let response = {
		texts: [],
		images: [],
		suggestions: [],
	};

	const parseSuggestions = (res) => {
		parseTextResponse(res.split(/<ar>/)[0]);
		response.suggestions = res.split(/<ar>/).splice(1);
	};

	const parseTextResponse = (res) => {
		if (res.includes('<img>')) parseImageResponse(res.split(/<br>/)[0]);
		const messages = res.split(/<br>/).splice(1);
		for (var message of messages) response.texts.push(message);
	};

  const parseImageResponse = (res) => {
		let images = res.split(/<img>/).splice(1);
		images.map((image) => response.images.push(image))
	}
  
	if (res.includes('<ar>')) parseSuggestions(res);
	else if (res.includes('<br>')) parseTextResponse(res);
	else if (res.includes('<img>')) parseImageResponse(res);
	else response.texts.push(res);
	return response;
}