
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , jwt = require('jwt-simple')
  , path = require('path');

var app = express();

// all environments
app.engine('html', require('ejs').__express);
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('www'));

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/login',function (req,res) {
	res.render('index', { title: 'Express' });
});

app.post('/token',function (req,res) {
	var username = req.headers.username;
	var password = req.headers.userpass;

	if(username == 'fuck' && password == 'you') {
		var token = jwt.encode({ username: username },'www');
		res.json({ token: token });
	} else {
		res.send(401,'Not Authenicated!');
	}
})

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
