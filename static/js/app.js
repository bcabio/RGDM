var MidiPlayer = require('MidiPlayer');
var loadFile, loadDataUri, Player, Player2;
var AudioContext = window.AudioContext || window.webkitAudioContext || false; 
var ac = new AudioContext || new webkitAudioContext;
var eventsDiv = document.getElementById('events');
var guitarUrl = 'https://raw.githubusercontent.com/gleitz/midi-js-soundfonts/gh-pages/MusyngKite/acoustic_guitar_nylon-mp3.js';

var changeTempo = function(tempo) {
	Player.tempo = tempo;
}

var play = function() {
	Player.play();
	Player2.play();
}

var pause = function() {
	Player.pause();
}

var stop = function() {
	Player.stop();
}

var buildTracksHtml = function() {
	Player.tracks.forEach(function(item, index) {
		var trackDiv = document.createElement('div');
		trackDiv.id = 'track-' + (index+1);
		var h5 = document.createElement('h5');
		h5.innerHTML = 'Track ' + (index+1);
		var code = document.createElement('code');
		trackDiv.appendChild(h5);
		trackDiv.appendChild(code);
		eventsDiv.appendChild(trackDiv);
	});
}

Soundfont.instrument(ac, guitarUrl).then(function (instrument) {

	loadFile = function() {
		var file    = document.querySelector('input[type=file]').files[0];
		var reader  = new FileReader();
		if (file) reader.readAsArrayBuffer(file);

		eventsDiv.innerHTML = '';

		reader.addEventListener("load", function () {
			Player = new MidiPlayer.Player(function(event) {
				if (event.name == 'Note on') {
					instrument.play(event.noteName, ac.currentTime, {gain:event.velocity/100});
					//document.querySelector('#track-' + event.track + ' code').innerHTML = JSON.stringify(event);
				}
			});

			Player.loadArrayBuffer(reader.result);		
			//buildTracksHtml();
			play();
		}, false);
	}

	loadDataUri = function(dataUri) {
		Player = new MidiPlayer.Player(function(event) {
			if (event.name == 'Note on' && event.velocity > 0) {
				instrument.play(event.noteName, ac.currentTime, {gain:event.velocity/100});
				//document.querySelector('#track-' + event.track + ' code').innerHTML = JSON.stringify(event);
				//console.log(event);
			}
		});

		Player2 = new MidiPlayer.Player(function(event) {
			if (event.name == 'Note on' && event.velocity > 0) {
				instrument.play(event.noteName, ac.currentTime, {gain:event.velocity/100});
				//document.querySelector('#track-' + event.track + ' code').innerHTML = JSON.stringify(event);
				//console.log(event);
			}		
		});
		Player.loadDataUri(dataUri);
		Player2.loadDataUri(chopin);
		// Player.tracks.push(new Track(Player.tracks.length, chopin));
		// Player.tracks.push(new Track(Player.tracks.length, mario));
		// console.log(Player.tracks);
		//buildTracksHtml();
		// play();
	}

loadDataUri(mario);
});

var superMario = class superMario{
	constructor(){
		this.height = 10;
		this.width = 2;
	}
}

var thing = 'data:audio/mid;base64,TVRoZAAAAAYAAAABAIBNVHJrAAAAhAGRPH88gTx/AJE+fzyBPn8AkUB/PIFAfwCRQn88gUJ/AJFDfzyBQ38AkUV/PIFFfwCRR388gUd/AJFIfzyBSH8AkUh/PIFIfwCRR388gUd/AJFFfzyBRX8AkUN/PIFDfwCRQn88gUJ/AJFAfzyBQH8AkT5/PIE+fwCRPH88gTx/AP8vAA=='
var chopin = 'data:audio/midi;base64,TVRoZAAAAAYAAQACAIBNVHJrAAACzAD/UQMPQkAAwAEAkEd/gwCAR38AkEh/gQCASH8AkEd/gwCAR38AkEh/gQCASH8AkEd/gwCAR38AkEh/gQCASH8AkEd/gwCAR38AkEZ/gQCARn8AkEV/gwCARX8AkEd/gQCAR38AkEV/gwCARX8AkEd/gQCAR38AkEV/gwCARX8AkEd/YIBHfwCQRX8ggEV/AJBFf4MAgEV/AJBEf4IAgER/AJBFf0CARX8AkEd/QIBHfwCQSn9AgEp/AJBIf0CASH8AkEB/QIBAfwCQRX9AgEV/AJBCf4MAgEJ/AJBFf4EAgEV/AJBCf4MAgEJ/AJBFf4EAgEV/AJBDf0CAQ38AkEJ/QIBCfwCQPH9AgDx/AJA7f0CAO38AkD9/QIA/fwCQQn9AgEJ/AJBKfyqASn8AkEh/KoBIfwCQR38sgEd/AJBHf4MAgEd/AJBIf4EAgEh/AJBHf4MAgEd/AJBIf4EAgEh/AJBHf4MAgEd/AJBIf4EAgEh/AJBHf2CAR38AkEZ/IIBGfwCQRn+BAIBGfwCQT3+BAIBPfwCQTn9ggE5/AJBMfyCATH8AkEx/QIBMfwCQS39AgEt/AJBUf0CAVH8AkEt/QIBLfwCQS39AgEt/AJBMf0CATH8AkE9/QIBPfwCQR39AgEd/AJBKf0CASn8AkEh/QIBIfwCQTH8qgEx/AJBAfyqAQH8AkEV/LIBFfwCQQn+BQIBCfwCQRX9AgEV/AJBCf4MAgEJ/AJBFf4EAgEV/AJBCf4MAgEJ/AJBCf2CAQn8AkEB/IIBAfwCQQH+DAIBAfwCQQn+BAIBCfwCQQH+DAIBAfwCQQn+BAIBCfwCQQH+CAIBAf4IAkFR/AE9/AEp/AEh/ggCAVH8AT38ASn8ASH8AkFR/AE9/AEp/AEh/ggCAVH8AT38ASn8ASH8AkFR/AE9/AEx/AEh/gQCAVH8AT38ATH8ASH8A/y8ATVRyawAADYwAwAEAkEBAADtAADdAQIBAQAA7QAA3QACQQEAAO0AAN0BAgEBAADtAADdAAJBAQAA7QAA3QECAQEAAO0AAN0AAkEBAADtAADdAQIBAQAA7QAA3QACQQEAAO0AAN0BAgEBAADtAADdAAJBAQAA7QAA3QECAQEAAO0AAN0AAkEBAADtAADdAQIBAQAA7QAA3QACQQEAAO0AAN0BAgEBAADtAADdAAJBAQAA5QAA2QECAQEAAOUAANkAAkEBAADlAADZAQIBAQAA5QAA2QACQQEAAOUAANkBAgEBAADlAADZAAJBAQAA5QAA2QECAQEAAOUAANkAAkD9AADlAADZAQIA/QAA5QAA2QACQP0AAOUAANkBAgD9AADlAADZAAJA/QAA5QAA2QECAP0AAOUAANkAAkD9AADlAADZAQIA/QAA5QAA2QACQP0AAOUAANUBAgD9AADlAADVAAJA/QAA5QAA1QECAP0AAOUAANUAAkD9AADlAADVAQIA/QAA5QAA1QACQP0AAOUAANUBAgD9AADlAADVAAJA+QAA5QAA1QECAPkAAOUAANUAAkD5AADlAADVAQIA+QAA5QAA1QACQPkAAOEAANUBAgD5AADhAADVAAJA+QAA4QAA1QECAPkAAOEAANUAAkD5AADhAADRAQIA+QAA4QAA0QACQPkAAOEAANEBAgD5AADhAADRAAJA+QAA4QAA0QECAPkAAOEAANEAAkD5AADhAADRAQIA+QAA4QAA0QACQPkAAN0AANEBAgD5AADdAADRAAJA+QAA3QAA0QECAPkAAN0AANEAAkD1AADdAADRAQIA9QAA3QAA0QACQPUAAN0AANEBAgD1AADdAADRAAJA8QAA3QAA0QECAPEAAN0AANEAAkDxAADdAADRAQIA8QAA3QAA0QACQPEAAN0AANEBAgDxAADdAADRAAJA8QAA3QAA0QECAPEAAN0AANEAAkDxAADZAADRAQIA8QAA2QAA0QACQPEAANkAANEBAgDxAADZAADRAAJA8QAA2QAA0QECAPEAANkAANEAAkDxAADZAADRAQIA8QAA2QAA0QACQPEAANkAANEBAgDxAADZAADRAAJA8QAA2QAA0QECAPEAANkAANEAAkDxAADZAADRAQIA8QAA2QAA0QACQPEAANkAANEBAgDxAADZAADRAAJA8QAA2QAAzQECAPEAANkAAM0AAkDxAADZAADNAQIA8QAA2QAAzQACQPEAANkAAM0BAgDxAADZAADNAAJA8QAA2QAAzQECAPEAANkAAM0AAkDxAADZAADJAQIA8QAA2QAAyQACQPEAANkAAMkBAgDxAADZAADJAAJA8QAA2QAAyQECAPEAANkAAMkAAkDxAADZAADJAQIA8QAA2QAAyQACQPEAANkAAMkBAgDxAADZAADJAAJA8QAA2QAAyQECAPEAANkAAMkAAkDxAADZAADJAQIA8QAA2QAAyQACQPEAANkAAMkBAgDxAADZAADJAAJA8QAA1QAAyQECAPEAANUAAMkAAkDxAADVAADJAQIA8QAA1QAAyQACQPEAANUAAMkBAgDxAADVAADJAAJA8QAA1QAAyQECAPEAANUAAMkAAkEdAADVAADJAQIBHQAA1QAAyQACQR0AANUAAMkBAgEdAADVAADJAAJBHQAA1QAAyQECAR0AANUAAMkAAkEdAADVAADJAQIBHQAA1QAAyQACQR0AANEAAMEBAgEdAADRAADBAAJBHQAA0QAAwQECAR0AANEAAMEAAkEVAADRAADBAQIBFQAA0QAAwQACQRUAANEAAMEBAgEVAADRAADBAAJBFQAA0QAAwQECARUAANEAAMEAAkEVAADRAADBAQIBFQAA0QAAwQACQRUAANEAAMEBAgEVAADRAADBAAJBFQAA0QAAwQECARUAANEAAMEAAkEVAADRAADtAQIBFQAA0QAA7QACQRUAANEAAO0BAgEVAADRAADtAAJBFQAAzQAA7QECARUAAM0AAO0AAkEVAADNAADtAQIBFQAAzQAA7QACQRUAANEAAMEBAgEVAADRAADBAAJBFQAA0QAAwQECARUAANEAAMEAAkEVAADRAADBAQIBFQAA0QAAwQACQRUAANEAAMEBAgEVAADRAADBAAJBFQAAzQAA7QECARUAAM0AAO0AAkEVAADNAADtAQIBFQAAzQAA7QACQRUAAM0AAO0BAgEVAADNAADtAAJBFQAAzQAA7QECARUAAM0AAO0AAkEVAADRAADBAQIBFQAA0QAAwQACQRUAANEAAMEBAgEVAADRAADBAAJBFQAA0QAAwQECARUAANEAAMEAAkEVAADRAADBAQIBFQAA0QAAwQACQRUAAM0AAO0CBAIBFQAAzQAA7QIMAkEBAADtAADdAQIBAQAA7QAA3QACQQEAAO0AAN0BAgEBAADtAADdAAJBAQAA7QAA3QECAQEAAO0AAN0AAkEBAADtAADdAQIBAQAA7QAA3QACQQEAAO0AAN0BAgEBAADtAADdAAJBAQAA7QAA3QECAQEAAO0AAN0AAkEBAADtAADdAQIBAQAA7QAA3QACQQEAAO0AAN0BAgEBAADtAADdAAJBAQAA5QAA2QECAQEAAOUAANkAAkEBAADlAADZAQIBAQAA5QAA2QACQQEAAOUAANkBAgEBAADlAADZAAJBAQAA5QAA2QECAQEAAOUAANkAAkD9AADlAADVAQIA/QAA5QAA1QACQP0AAOUAANUBAgD9AADlAADVAAJA/QAA5QAA1QECAP0AAOUAANUAAkD9AADlAADVAQIA/QAA5QAA1QACQP0AAOEAANUBAgD9AADhAADVAAJA/QAA4QAA1QECAP0AAOEAANUAAkD5AADhAADVAQIA+QAA4QAA1QACQPkAAOEAANUBAgD5AADhAADVAAJA+QAA3QAA0QECAPkAAN0AANEAAkD5AADdAADRAQIA+QAA3QAA0QACQPkAAN0AANEBAgD5AADdAADRAAJA+QAA3QAA0QECAPkAAN0AANEAAkD5AADdAADRAQIA+QAA3QAA0QACQPkAAN0AANEBAgD5AADdAADRAAJA9QAA3QAA0QECAPUAAN0AANEAAkD1AADdAADRAQIA9QAA3QAA0QACQRkAANEAAMUBAgEZAADRAADFAAJBGQAA0QAAxQECARkAANEAAMUAAkEVAADRAADBAQIBFQAA0QAAwQACQRUAANEAAMEBAgEVAADRAADBAAJA7QAAvQECAO0AAL0AAkFFAAE5AADxAAEVAQIBRQABOQAA8QABFQACQUUAATkAAPEAARUBAgFFAAE5AADxAAEVAAJBRQABOQAA8QABFQECAUUAATkAAPEAARUAAkE5AAEtAAEdAAENAQIBOQABLQABHQABDQACQTEAAR0AAQ0BAgExAAEdAAENAAJBMQABHQABDQECATEAAR0AAQ0AAkExAAEdAAENAQIBMQABHQABDQACQTEAAPEAARUBAgExAADxAAEVAAJBMQAA8QABFQECATEAAPEAARUAAkDlAQIA5QACQPEAANkAANEBAgDxAADZAADRAAJBHQAA0QAA7QECAR0AANEAAO0AAkEdAADRAADtAQIBHQAA0QAA7QACQRUAANEAAMEBAgEVAADRAADBAAJBFQAA0QAAwQECARUAANEAAMEAAkDtAADRAAC9AQIA7QAA0QAAvQACQO0AANEAAL0BAgDtAADRAAC9AAJA7QAA0QAAvQECAO0AANEAAL0AAkDtAADRAAC9AQIA7QAA0QAAvQACQOUAANEAAMEBAgDlAADRAADBAAJA5QAA0QAAwQECAOUAANEAAMEAAkDlAADRAADBAQIA5QAA0QAAwQACQOUAANEAAMEBAgDlAADRAADBAAJA7QAA0QAAvQECAO0AANEAAL0AAkDtAADRAAC9AQIA7QAA0QAAvQACQO0AANEAAL0BAgDtAADRAAC9AAJA7QAA0QAAvQECAO0AANEAAL0AAkDtAADNAADtAQIA7QAAzQAA7QACQO0AAM0AAO0BAgDtAADNAADtAAJA5QAAzQAA7QECAOUAAM0AAO0AAkDlAADNAADtAQIA5QAAzQAA7QACQN0AANEAAMEBAgDdAADRAADBAAJA3QAA0QAAwQECAN0AANEAAMEAAkDdAADRAADBAQIA3QAA0QAAwQACQN0AANEAAMEBAgDdAADRAADBAAJA6QAA0QAAwQECAOkAANEAAMEAAkDpAADRAADBAQIA6QAA0QAAwQACQOUAANEAAMEBAgDlAADRAADBAAJA5QAA0QAAwQECAOUAANEAAMEAAkDlAADRAADtAQIA5QAA0QAA7QACQOUAANEAAO0BAgDlAADRAADtAAJA4QAA0QAA7QECAOEAANEAAO0AAkDhAADRAADtAQIA4QAA0QAA7QACQN0AANEAAO0BAgDdAADRAADtAAJA3QAA0QAA7QECAN0AANEAAO0AAkDdAADRAADtAQIA3QAA0QAA7QACQN0AANEAAO0BAgDdAADRAADtAAJA3QAAwQAA6QIIAgDdAADBAADpAggCQO0AAL0CCAIA7QAAvQACQO0AANkAAL0CCAIA7QAA2QAAvQACQKEAAHECEAIAoQAAcQAD/LwA=';
var mario = 'data:audio/midi;base64,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QgAAOQAPOWQAQmQtQgAAOQBLJmQtJgAPOWQAQmQtQgAAOQAPOWQAQmQtQgAAOQBLK2QtKwAPQ2QAO2QtOwAAQwAPQ2QAO2QtOwAAQwBLT1AAK2QtKwAPQ2QAO2QtOwAAQwAPO2QAQ2QtQwAAOwBLTwAATVAAL2QtLwAPQWQAR2QtRwAAQQAPQWQAR2QtRwAAQQBLTQAATFAAMGQtMAAPQGQASGQtSAAAQAAPQGQASGQtSAAAQABLTAAAMWQAS1AtMQAPP2QASWQtSQAAPwAPP2QASWQtSQAAPwBLSwAAMmQASlAtMgAPQmQARWQtRQAAQgAPQmQARWQtRQAAQgBLSgAAKmQASFAtKgAPPmQAQmQtQgAAPgAPPmQAQmQtQgAAPgBLSAAAL2QAN2QAR1AtNwAALwBLK2QAL2QtLwAAKwBLRwAAL2QAN2QtNwAALwBLSmRaSgAASGQeSAAAN2QAK2QAR2Q8NwAAO2Q8OwAARwAAPmQASmQ8PgAAO2Q8OwAASgAAKwAAN2QAL2QAT2Q8NwAAO2Q8OwAAPmQ8PgAATwAATmQAO2Q8OwAATgAALwAAPGQAMGQAS2Q8PAAAQGQ8QAAASwAAQ2QATGQ8QwAAQGQ8QAAATAAAMAAAMWQAPWQAUWQ8PQAAQGQ8QAAAQ2Q8QwAAUQAAT2QAQGQ8QAAATwAAMQAAPmQAMmQ8PgAAQmQ8QgAARWQ8RQAAQmQ8QgAAMgAAPmQALWQ8PgAAQmQ8QgAARWQ8RQAAQmQ8QgAALQAAN2QAL2Q8NwAAO2Q8OwAAPmQ8PgAAO2Q8OwAALwAAN2QAK2Q8NwAAO2Q8OwAASmQAPmQ8PgAAO2QeSgAASGQeSAAAOwAAKwAAN2QAK2QAR2Q8NwAAO2Q8OwAARwAAPmQASmQ8PgAAO2Q8OwAASgAAKwAAN2QAL2QAT2Q8NwAAO2Q8OwAAPmQ8PgAATwAATmQAO2Q8OwAATgAALwAAPGQAMGQAS2Q8PAAAQGQ8QAAASwAAQ2QATGQ8QwAAQGQ8QAAATAAAMAAAMWQAPWQAUWQ8PQAAQGQ8QAAAQ2Q8QwAAUQAAQGQAT2Q8TwAAQAAAMQAAPmQAMmQ8PgAAQmQ8QgAARWQ8RQAAQmQ8QgAAMgAAOWQAKmQ8OQAAPmQ8PgAAQmQ8QgAAPmQ8PgAAKgAAO2QAK2Q8OwAAPmQ8PgAAOWQ8OQAAPmQ8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';
