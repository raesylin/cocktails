// Recommend panel controle
app.controller('recCtrl', ['$scope', '$location', 'dataService', function($scope, $location, dataService) {

	var self = this;

	var onSuccess = function(data) {
		// The retrieved data is filtered cocktail list
		self.cocktails = data;

		// randomize
		self.selected = (function() {
			var index = Math.floor(Math.random() * self.cocktails.length);
			return self.cocktails[index];
		}());

	};

	var onError = function(reason) {
		console.log('Error retrieving data: ' + reason);
	};

	self.showMore = function() {
		$location.path('/show/');
	};

	dataService.getCocktails().then(onSuccess, onError);

}]);