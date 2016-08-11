app.config(function($routeProvider) {
	
	$routeProvider

		.when("/", {
			templateUrl: "pages/home.html",
			controller: "mainCtrl",
			controllerAs: "ctrl"
		})

		.when("/show", {
			templateUrl: "pages/show.html",
			controller: "showCtrl"
		})

		.otherwise({
			redirect: "/"
		});

});