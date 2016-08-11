app.controller('topCtrl', ['$scope', function($scope){

	/**
	 * Global storage for cross-controller data:
	 */
	$scope.collection = {
		/* the complete cocktail list from api or database */
		cocktails: [],
		/* the ingredient list for input suggestion; only strings in array, not formatted. This list will not change during user input; only mainCtrl's self.suggestedIngredients will update every time user input or remove an ingredient */
		allIngredients: [],
		/* Filtered cocktail list with cocktails that contains at least one of the user input ingredients */
		filteredCocktails: [],
		/* User input ingredient list */
		userIngredients: [],
		/* Ranked cocktail list according to user input */
		sortedCocktails: [],
		/* list of recommended cocktails scored and selected according to user input */
		recommendCocktails: []
	};


}]);