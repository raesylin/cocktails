app.controller('showCtrl', ['$scope', 'dataService', function($scope, dataService){
	
	var self = this;

	self.showingAll = false;
	self.limitVal = 10; // show only 10 records if many exist

	function shuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex;

		// while there remain elements to shuffle
		while (0 !== currentIndex) {

			// pick a remaining element
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// swap it with the current element
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}


	if ($scope.collection.cocktails.length === 0) {
		dataService.getCocktails().then(function(data) {
			$scope.collection.cocktails = data;
			$scope.collection.sortedCocktails = $scope.collection.cocktails.slice(0);
			self.showingAll = true;
			console.log("Loaded cocktail list.");
		});
		
	} else {
		if ($scope.collection.sortedCocktails.length === 0) {
			$scope.collection.sortedCocktails = $scope.collection.cocktails.slice(0);
			// Randomize cocktail list from api or database since there is no filter 
			shuffle($scope.collection.sortedCocktails);

			self.showingAll = true;
		}
		console.log("Inherited cocktail list.");
	}




}]);