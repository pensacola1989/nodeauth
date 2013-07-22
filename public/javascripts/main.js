var Site = Site || {};
Site.View = Site.View || {};
Site.Model = Site.Model || {};


Site.Model.user = Backbone.Model.extend({
	defaults: {
		name: 'www',
		age: 24
	}
});

Site.Router = Backbone.Router.extend({
	routes: {
		'index': 'index',
		'': 'index',
		'login': 'login',
		'user': 'users',
		'person': 'person'
	},

	views: {},

	initialize: function () {
		_.bindAll(this,'index','login','person');
		this.views.index = new Site.View.index({ model: new Site.Model.user() });
		this.views.login = new Site.View.login();
		this.views.person = new Site.View.person();

		this.view = this.views.index;
		this.view.render();
	},

	index: function () {
		this.view = this.views.index;
		this.view.render();
	},

	person: function () {
		if(!App.user) {
			this.navigate('login',true);
			return;
		}
		this.view = this.views.person;
		this.view.render();
	},

	login: function () {
		if(App.user) {
			this.navigate('person',true);
			return;
		}
		this.view = this.views.login;
		this.view.render();
	}

});

Site.View.index = Backbone.View.extend({

	initialize: function () {

		// console.log(this.model.get('name'));	
	},

	el: '.container',

	events: {
		'click #sign' : 'sign'
	},

	sign: function () {
		Site.router.navigate('login',true);
		// var view = new Site.View.login();
		// view.render();
	},

	render:function () {
		var temp = $('#index').html();
		$(this.el).html($(temp).fadeIn());
		return this;
	}
});

Site.View.login = Backbone.View.extend({

	initialize: function () {
		_.bindAll(this,'getLogin');

	},

	el: '.container',

	events: {
		'click #submit': 'getLogin'
	},

	getLogin: function () {
		userdata = { username: 'fuck', userpass: 'you' };
		$.ajax({
			url: '/api/token',
			type: 'POST',
			headers: userdata,
			dataType: 'json',
		}).success(function (data) {
			App.user = 'www';
			Cookies.set('token',data.token);
			Site.router.navigate('person',true);
		}).error(function (err) {
			console.log(err);
		}).done(function () {
			console.log('complete');
		});

	},

	render: function () {
		var temp = $('#login').html();
		$(this.el).html($(temp).fadeIn());
		return this;
	}
});

Site.View.person = Backbone.View.extend({

	el: '.container',

	events: {
		'click #idx': 'gotoIndex'
	},

	gotoIndex: function () {
		Site.router.navigate('index',true);
	},

	initialize: function () {
			
	},

	render: function () {	
		$(this.el).html('<h1>this is a personal Page!<br/> <a id="idx" href="javascript:void(null);">Index</a>');
	}
});

Site.init = function () {

	Site.router = new Site.Router();
	Backbone.history.start({ pushState: true });
	// App.user = { name: 'www', age: 25 };
}
