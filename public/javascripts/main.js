var Site = Site || {};
Site.View = Site.View || {};
Site.Router = Backbone.Router.extend({
	routes: {
		'': 'index',
		'login': 'login',
		'user': 'users'		
	},

	views: {},

	initialize: function () {
		_.bindAll(this,'index','login','person');
		this.views.index = new Site.View.index();
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
		this.view = this.views.person;
		this.view.render();
	},

	login: function () {
		this.view = this.views.login;
		this.view.render();
	}

});

Site.View.index = Backbone.View.extend({

	el: '.container',

	events: {
		'click #sign' : 'sign'
	},

	sign: function () {
		var view = new Site.View.login();
		view.render();
	},

	render:function () {
		var temp = $('#index').html();
		$(this.el).html($(temp).fadeIn());
		return this;
	}
});

Site.View.login = Backbone.View.extend({

	el: '.container',

	render: function () {
		var temp = $('#login').html();
		$(this.el).html($(temp).fadeIn());
		return this;
	}
});

Site.View.person = Backbone.View.extend({

});


$(document).ready(function () {
	var router = new Site.Router();
	Backbone.history.start({ pushState: true });
});