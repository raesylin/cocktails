app.controller('recCtrl', ['$scope', '$filter', '$location', function($scope, $filter, $location){
	
	var self = this;

	self.showRecommendCocktails = showRecommendCocktails;
	self.noMatch = false;

	/**
	 * Giving the cocktail a score based on ingredient matching: +1 if an ingredient matched any one in user list, -1 if not. Normalized by ingredient numbers of that cocktail
	 * @param  {object} cocktail    cocktail object to be valued
	 * @param  {array} ingredients user ingredient list
	 * @return {number}             score of the cocktail wrt the user ingredients
	 */
	function scoreCocktail(cocktail, ingredients) {
		
		if (ingredients.length === 0) {
			/**
			 * If user did not input any ingredient list, give every cocktail score of 1
			 */
			return 1;

		} else {

			var score = 0;
		
			angular.forEach(cocktail.ingredients, function(item) {
				var index = ingredients.indexOf(item);
				if (index >= 0) {
					score += 1;
				} else {
					score -= 1;
				}
			});

			return (score / cocktail.ingredients.length);
		}

	}

	/**
	 * Sorting cocktails according to their score and return the first tier of cocktails
	 * @param  {array} cocktails cocktail list
	 * @return {array}           cocktail list of first tier
	 */
	function selectFirstGroup(cocktails) {

		/**
		 * Sorting cocktail according to their scores (descending)
		 */
		var sortedCocktails = $filter("orderBy")(cocktails, "score", true);
		
		/* Copy to global storage */
		$scope.collection.sortedCocktails = sortedCocktails.slice(0);

		/**
		 * Remove cocktails with score less than that of first tier
		 */
		var firstTierScore = sortedCocktails[0].score;

		/**
		 * If no perfect match (=== user has every materials), show warning phrase
		 */
		if (firstTierScore !== 1) {
			self.noMatch = true;
			console.log("No match");
		}

		for (var i = 0; i < sortedCocktails.length; i++) {
			if (sortedCocktails[i].score < firstTierScore) {
				sortedCocktails.splice(i);
			}
		}

		return sortedCocktails;

	}

	/**
	 * Recommend one cocktail from the cocktail list given
	 * @param  {array} cocktails list of cocktails
	 * @return {object}           recommended cocktail
	 */
	function recommend(cocktails) {
		var index = Math.floor(Math.random() * cocktails.length);
		return cocktails[index];
	}

	/**
	 * Redirect to /show route to display other recommended drinks
	 */
	function showRecommendCocktails() {
		$location.path('/show');
	}

	if ($scope.collection.userIngredients.length !== 0) {
		/**
		 * Get filteredCocktails cocktail list based on user ingredients
		 */
		$scope.collection.filteredCocktails = $filter("cocktailFilter")($scope.collection.cocktails, $scope.collection.userIngredients);

		/**
		 * Get a matching score for each one of the cocktails based on the user ingredient list
		 */
		angular.forEach($scope.collection.filteredCocktails, function(cocktail) {
			cocktail.score = scoreCocktail(cocktail, $scope.collection.userIngredients);
		});
		/**
		 * Select the first group of cocktails according to the scoring
		 */
		$scope.collection.recommendCocktails = selectFirstGroup($scope.collection.filteredCocktails);
		
	} else {
		$scope.collection.recommendCocktails = $scope.collection.cocktails.slice(0);
	}

	/**
	 * Randomly select one cocktail from the recommendation list
	 */
	self.selectedCocktail = recommend($scope.collection.recommendCocktails);
	

}]);