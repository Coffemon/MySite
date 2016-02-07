var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
	extended: true
}));

var handlebars = require('express-handlebars')
		.create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.get('/', function(req, res){
		res.render('home');
});


var threads = [{id: 1, title: 'Titel', text: 'hello'}];


app.get('/threads', function (req, res) {
	res.json({ threads: threads });
});


app.get('/threads/:id', function (req, res) {
	var thread = threads[req.params.id];

	res.json(thread);
});


app.put('/threads/:id', function (req, res) {
	var id = req.params.id;
	var status = 'ERR';

	if (typeof threads[id] !== 'undefined') {
		threads[id].title = req.body.title;
		threads[id].text = req.body.text;

		status = 'OK';
	}

	res.json({ status: status });
});

app.post('/threads', function (req, res) {
	threads.push({
		id: req.body.id,
		title: req.body.title,
		text: req.body.text
	});

	res.json({ status: 'CREATED', insertId: threads.length - 1 });
});


app.delete('/threads/:id', function (req, res) {
	delete threads[req.params.id];

	res.json({ code: 'OK', message: 'deleted successful' });
});



var server = app.listen(1337, function () {
	console.log('Server started. Listening to leets on port 1337\n');
});