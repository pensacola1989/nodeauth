
var jwt = require('jwt-simple');

var config = config || {};
config.auth = function (req,res,next) {
	var decoded = jwt.decode(req.headers.token, 'www');
	if(decoded) {
		next()
	} else {
		res.send(401,'Not Authorized!');		
	}
};

config.setRoute = function (app) {
	app.get('/',function (req,res) {
		res.render('index', { title: 'Express' });
	});

	app.get('/login',function (req,res) {
		res.render('index', { title: 'Express' });
	});

	app.post('/token',function (req,res) {
		var username = req.headers.username;
		var password = req.headers.userpass;

		if(username == 'fuck' && password == 'you') {
			var token = jwt.encode({ username: username },'www');
			res.cookie('token',token);
			res.json({ token: token });
		} else {
			res.send(401,'Not Authenicated!');
		}
	});

	app.get('/person',config.auth,function (req,res) {
		res.render('person');
	});
}

exports.setRoute = config.setRoute;