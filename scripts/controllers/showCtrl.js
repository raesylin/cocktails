app.controller('showCtrl', ['$scope', 'dataService', function($scope, dataService){
	
	var self = this;

	self.showingAll = false;

	if ($scope.collection.cocktails.length === 0) {
		dataService.getCocktails().then(function(data) {
			$scope.collection.cocktails = data;
			$scope.collection.recommendCocktails = $scope.collection.cocktails.slice(0);
			self.showingAll = true;
			console.log("Loaded cocktail list.");
		});
		
	} else {
		console.log("Inherited cocktail list.");
	}



}]);