// CONTROLLER FOR DROPDOWN MENU & MAIN PAGE
app.controller('mainCtrl', ['$scope', '$location', '$compile', 'dataService', function($scope, $location, $compile, dataService){
	
	var self = this;
	// md-autocomplete settings:
	self.simulateQuery = false;
	self.isDisabled = false;
	self.noCache = true;

	// initiatial ingredient list
	self.ingredients = [];
	self.querySearch = querySearch;
	self.selectedItemChange = selectedItemChange;
	self.searchTextChange = searchTextChange;
	self.clearIngredient = clearIngredient;
	self.submit = submit;

	// all ingredients from database; not formatted yet
	self.allIngredients = [];
	// final ingredient list by user:
	self.output = [];



	// **********************************************************
	// Internal functions
	// **********************************************************

	function querySearch(query) {
		var results = query ? self.ingredients.filter( createFilterFor(query) ) : self.ingredients, deferred;

		return results;
	}

	function searchTextChange(text) {
		// do nothing
	}

	// AFTER SELECTING AN ITEM:
	function selectedItemChange(item) {
		if (item !== null && item !== undefined) {
			self.output.push(item.value);
			updateIngredients(item);
		}
	}

	// REMOVE SELECTED ITEM FROM SUGGESTED LIST
	function updateIngredients(item) {
		var index = self.ingredients.indexOf(item);
		self.ingredients.splice(index, 1);
	}

	// Cosmetic function
	function capitalize(str) {
		return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	}

	function loadAll() {
	
		return self.allIngredients.map(function(ing) {
			return {
				value: ing,
				display: capitalize(ing)
			};
		});
	}

	function createFilterFor(query) {
		var lowercaseQuery = angular.lowercase(query);
		return function filterFn(ing) {
			return (ing.value.indexOf(lowercaseQuery) >= 0);
		};
	}

	function clearIngredient() {
		self.output = [];
		self.selectedItem = null;
		self.searchText = '';
		jQuery('.recommend-panel').empty();
	}

	function submit() {
		// empty existing (if any) recommendation panel content
		jQuery('.recommend-panel').empty();

		// get cocktail list (filtered if user has input ingredients)
		dataService.ingredients = self.output;

		// show recommendation panel
		var compiledHTML = $compile('<div class="recommend-panel"></div>')($scope);
		jQuery('#home').append(compiledHTML);

	}

	// RETRIEVE ALL INGREDIENTS FROM DATABASE
	dataService.getCocktails().then(function(data) {

		angular.forEach(data, function(cocktail) {

			angular.forEach(cocktail.ingredients, function(ing) {

				if (self.allIngredients.indexOf(ing) < 0) {
					self.allIngredients.push(ing);
				}
			});

		});

		self.allIngredients.sort();
		// Format the ingredients
		self.ingredients = loadAll();
	}, function(error) {
		console.log(error);
	});


}]);