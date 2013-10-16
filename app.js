
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var fs = require('fs');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// create static site
app.get('/', function(req, res){
	fs.readFile(__dirname + '/index.html', function(err, data){ //no return value
		res.setHeader('Content-Type', 'text/html')

		if(err){
			res.writeHead(404)
			res.end("FILE NOT FOUND")
		}
		else{
			res.writeHead(200)
			res.end(data)
		}

	});
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

app.post('/formsubmit', function(req, res){
	
	console.log(req.body.firstname)
	console.log(req.body.lastname)
	res.redirect('/success')
	// req.body.firstname+ " "+req.body.lastname)

});
app.get('/success', function(req, res){
	res.send('<div>SUCCESS!</div>');
});
app.post('/signup', function(req, res){

	setTimeout(function(){
		
	// if there is a bit of data called "email" in the response body
	// then return a JSON object with a property called "success"
	if(req.body.username && req.body.email){
		console.log("username:", req.body.username);
		console.log("email:", req.body.email);

		res.send({success : 'Success!', username: req.body.username, email: req.body.email})
	}
	else{ // If there isnt a bit of data called "email", return an error
		res.send({error : "Please provide your username and e-mail."})
	}
	},4000);
})
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
