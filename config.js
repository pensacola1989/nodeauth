
var jwt = require('jwt-simple');

var config = config || {};
config.auth = function (req,res,next) {
	if(!req.headers.token)
		res.send(401,'need AuthToken!');
	var decoded = jwt.decode(req.headers.token, 'www');
	if(decoded) {
		next()
	} else {
		res.send(401,'Not Authorized!');		
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
		return json({
			id: req.params.id
		});
	});

}

exports.setRoute = config.setRoute;