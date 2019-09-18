import Speech from 'speak-tts';

const speech = new Speech();
speech
	.init({
		volume: 0.5,
		lang: 'en-GB',
		rate: 1,
		pitch: 1,
		voice: 'Google UK English Female'
	})
	.catch((error) =>
		console.error('An error occured while initializing Speech : ', error)
	);

export default speech;
