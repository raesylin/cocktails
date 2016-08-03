'use strict';

// dataServce: To store and process filter functions
// @var dataService.ingredients {array} storing cocktail list
// @var dataService.selected {object} the selected cocktail object (for single.html page)

app.service('dataService', ['$http', function($http){
	
	var self = this;

	// SET INGREDIENT FILTER
	this.ingredients = [];

	// FILTER: RETURN TRUE IF RECIPE CONTAINS ONE OF THE INGREDIENT
	this.containsOne = function(haystack, arr) {
		// @param heystack {array} the array to be examined
		// @param arr {array} the criteria
		return arr.some(function(v) {
			return haystack.indexOf(v) >= 0;
		});
	};
	// FILTER: RETURN TRUE IF RECIPE CONTAINS ALL INGREDIENTS
	this.containsAll = function(haystack, arr) {
		// @param heystack {array} the array to be examined
		// @param arr {array} the criteria
		for (var i = 0; i < arr.length; i++) {
			if (haystack.indexOf(arr[i]) === -1)
				return false;
		} 
		return true;
	};

	// OUTPUT COCKTAILS WHICH MEET THE CRITERIA IN AN ARRAY 
	this.ingFilter = function(input, criteria) {
		// @param input {array} the complete list of cocktails
		// @param criteria {array} the ingredients user have
		var out = [];
		angular.forEach(input, function(cocktail) {
			// For each cocktail in input examine its ingredients with criteria
			if (self.containsAll(cocktail.ingredients, criteria)) {
				out.push(cocktail);
			}

		});

		if (out.length === 0) {
			// If no cocktail matches the criteria (length === 0), use less strict filter
			angular.forEach(input, function(cocktail) {
				if (self.containsOne(cocktail.ingredients, criteria)) {
					out.push(cocktail);
				}
			});
		}
		return out;
	}

	// GET COCKTAIL LIST
	this.getCocktails = function() {

		return $http.get('api/data.json')
			.then(function(response) {
				var results = response.data;
				// return results;
				if (self.ingredients.length === 0) {
					return results;
				} else {
					return self.ingFilter(results, self.ingredients);
				}
				
			});

	};


}]);