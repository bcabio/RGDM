const scribble = require('./../../scribbletune/src');

module.exports.generatePercussionTrack = function () {
	let percussionClip = scribble.clip({
		notes: ['c4'],
		pattern: '--x-'.repeat(4)
	})

	return {
		'midiString': scribble.toBase64String(percussionClip),
		'sf': 'https://raw.githubusercontent.com/gleitz/midi-js-soundfonts/gh-pages/MusyngKite/synth_drum-mp3.js'
	};
}