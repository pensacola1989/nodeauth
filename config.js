
var jwt = require('jwt-simple');

var config = config || {};
config.auth = function (req,res,next) {
	var decoded;

	if(req.headers.token) {
		console.log('...............................')
		decoded = jwt.decode(req.headers.token, 'www');	
		if(decoded) {
			console.log(decoded);
			next();
		} 
	} else {
		res.send(401,'Not Authenicated!');
		res.end();		
	}
};

config.setRoute = function (app) {


	app.post('/api/token',function (req,res) {
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

	/*
	*  This is not for API-Auth
	*/
	app.get('*',function (req,res,next) {
		var tag = (req.url.indexOf('/javascript') == 0) || (req.url.indexOf('/api') == 0);
		if(tag) 
			return next();
		var isAuth = req.cookies.token ? true : false;
		res.render('index', { auth: isAuth });
	});

	app.post('/api/test',config.auth,function (req,res) {
		res.json({
			'fuck': 'you'
		});
	});

	app.get('/api/test/:id',config.auth,function (req,res) {
		res.json({
			id: req.params.id
		});
	});

}

exports.setRoute = config.setRoute;