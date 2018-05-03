const scribble = require('./../../scribbletune/src');


module.exports.generateBassTrack = function() {
	// let beatArr = scribble.clip({
	// 	notes: [],
	// 	pattern: ''
	// });
	// let x = ['e2', 'd2', 'c2', 'b1'];
	// for(var i in x) {
	// 	console.log(beatArr.length);
	// 	let bassClip = scribble.clip({
	// 		notes: [x[i]],
	// 		pattern: 'x___x-x-x___x___'.repeat(4)
	// 	});
	// 	beatArr += beatArr.concat(bassClip);
	// 	// console.log(bassClip);
	// 	console.log(beatArr);
	// }
	let bassClip = scribble.clip({
		notes: ['e2'],
		pattern: 'x-------'.repeat(4)
	});
	return { 
		'midiString': scribble.toBase64String(bassClip),
		'sf': 'https://raw.githubusercontent.com/gleitz/midi-js-soundfonts/gh-pages/MusyngKite/lead_8_bass__lead-mp3.js' }
};

