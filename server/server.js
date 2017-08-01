const express = require('express');
const scribble = require('./../scribbletune/src');

const bassEngine = require('./generators/bass-generator');
const percussionEngine = require('./generators/percussion-generator');

// console.log(bassEngine);

const app = express();

app.use(express.static('./../'));

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {
  res.sendFile('index.html');
});

app.get('/generateMusic', function(req, res) {
	res.send({
		'bassMidiTrack': bassEngine.generateBassTrack()
		// 'percussionMidiTrack': percussionEngine.generatePercussionTrack()
	});
});

app.listen(app.get('port'), function() {
	console.log("App listening on " + app.get('port'))
});
