// MAIN CONTROL
app.controller('mainCtrl', ['$scope', '$location', 'dataService', function($scope, $location, dataService){

	$scope.ingredients = [];
	$scope.ing = '';

	$scope.addIngredient = function() {
		$scope.ingredients.push($scope.ing);
		$scope.ing = '';
	};

	$scope.clearIngredient = function() {
		$scope.ingredients = [];
		$scope.ing = '';
	};

	$scope.submit = function() {
		dataService.ingredients = $scope.ingredients;
		$location.path('/show');
	}
	
}]);


// SHOW CONTROL FOR SHOWING ALL COCKTAIL RECIPES AND A FILTER
app.controller('showCtrl', ['$scope', '$routeParams', '$location', 'dataService', function($scope, $routeParams, $location, dataService){

	$scope.recid = Number($routeParams.id) || 0;

	// Dealing with fetching data, if success:
	var onCocktailComplete = function(data) {
		$scope.cocktails = data;
		if (isNaN($scope.recid) || $scope.recid === 0) {
		
		} else {
			console.log($scope.cocktails);
			for (var i = 0; i < $scope.cocktails.length; i++) {
				if ($scope.cocktails[i].id == $scope.recid) {
					$scope.selectedCocktail = $scope.cocktails[i];
					break;
				}
			}
		}

	};
	// if error:
	var onError = function(reason) {
		$scope.error = "Could not fetch data b/c: " + reason;
	};

	// FETCHING COCKTAIL DATA:
	dataService.getCocktails().then(onCocktailComplete, onError);

	

	// Dealing with fetching data, if success:
	// var onCocktailComplete = function(data) {
	// 	$scope.cocktails = data;
	// };
	// // if error:
	// var onError = function(reason) {
	// 	$scope.error = "Could not fetch data b/c: " + reason;
	// };

	// // FETCHING COCKTAIL DATA:
	// dataService.getCocktails().then(onCocktailComplete, onError);

}]);

