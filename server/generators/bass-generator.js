const scribble = require('./../../scribbletune/src');


module.exports.generateBassLine = function() generateBassLine {
	let bassClip = scribble.clip({
		notes: ['e2', 'd2', 'c2', 'b1'],
		pattern: 'x_______________'.repeat(4)
	});
	return { 
		'midiString': scribble.toBase64String(bassClip),
		'sf': 'soundfontUrlBass'
};

