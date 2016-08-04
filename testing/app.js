angular.module('demo', ['ngMaterial'])
.controller('dropdownCtrl', ['$timeout', '$q', '$log', function($timeout, $q, $log){
	
	var self = this;

	self.ingredients = loadAll();
	self.querySearch = querySearch;
	self.selectedItemChange = selectedItemChange;
	self.searchTextChange = searchTextChange;

	// *********************************************
	// Internal methods
	// *********************************************

	function querySearch(query) {
		var results = query ? self.ingredients.filter(createFilterFor(query)) : self.ingredients, deferred;
		return results;
	}

	function searchTextChange(text) {
		$log.info('Text changed to ' + text);
	}

	function selectedItemChange(item) {
		$log.info('Item changed to ' + JSON.stringify(item));
	}

	/**
	 * Build ingredient list of key/value pairs
	 */
	function loadAll() {
		var allIngredients = ['vodka', 'orange juice', 'lime juice', 'rum'];
		return allIngredients.map(function(ing) {
			return {
				value: ing.toLowerCase(),
				display: ing
			};
		})
	}

	/**
	 * Create filter function for a query string 
	 */
	function createFilterFor(query) {
		var lowercaseQuery = angular.lowercase(query);
		return function filterFn(ing) {
			return (ing.value.indexOf(lowercaseQuery) === 0);
		};
	}
	
}]);