var express = require('express');
var scribble = require('./scribbletune/src')

const app = express();

app.use(express.static(__dirname));

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res){
  res.sendFile('index.html');
});

app.listen(app.get('port'), function() {
	console.log("App listening on " + app.get('port'))
});
