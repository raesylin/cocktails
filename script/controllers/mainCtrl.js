// MAIN CONTROL
app.controller('mainCtrl', ['$scope', '$location', '$compile', 'dataService', function($scope, $location, $compile, dataService){

	$scope.ingredients = [];
	$scope.ing = '';
	$scope.showRec = false; // hide recommendation panel

	$scope.addIngredient = function() {
		$scope.ingredients.push($scope.ing);
		$scope.ing = '';
	};

	$scope.clearIngredient = function() {
		$scope.ingredients = [];
		$scope.ing = '';
		$('.recommend-panel').empty();
	};

	$scope.submit = function() {
		// empty existing (if any) recommendation panel content
		$('.recommend-panel').empty();

		// get cocktail list (filtered if user has input ingredients)
		dataService.ingredients = $scope.ingredients;

		// show recommendation panel
		var compiledHTML = $compile("<div class='recommend-panel'></div>")($scope);
		$('#home').append(compiledHTML);

	};
	
}]);
