app.config(function($routeProvider) {

	$routeProvider
		// homepage
		.when("/", {
			templateUrl: "pages/home.html",
			controller: "mainCtrl"
		})

		// displaying all cocktails with filter function
		.when("/show", {
			templateUrl: "pages/show.html",
			controller: "showCtrl"
		})

		// showing individual cocktail details
		.when("/show/:id", {
			templateUrl: "pages/single.html",
			controller: "showCtrl"
		})

		// redirect
		.otherwise({
			redirectTo: '/'
		});

});