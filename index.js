var express = require('express');

const app = express();

app.use(express.static(__dirname));

app.set('port', (process.env.PORT || 5000));

app.get('/index', function(req, res){
  res.sendFile('index.html');
});

app.listen(app.get('port'), function() {
	console.log("App listening on " + app.get('port'))
});
