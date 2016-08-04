// CONTROLLER FOR DROPDOWN MENU & MAIN PAGE
app.controller('mainCtrl', ['$scope', '$location', '$compile', '$filter', 'dataService', function($scope, $location, $compile, $filter, dataService){
	
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
	self.focus = focus;
	self.removeIngredient = removeIngredient;

	// all ingredients from database; not formatted yet
	self.allIngredients = [];
	// final ingredient list by user:
	self.output = [];

	// Animation control
	self.moveUp = false;
	self.moveUpMain = moveUpMain;


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
			self.searchText = null;
		}
	}

	// UPDATE SUGGESTED LIST:
	// If item already exists, remove this item;
	// if item not exsit (been removed previously), add it back
	function updateIngredients(item) {
		var index = self.ingredients.indexOf(item);
		if (index === -1) {
			self.ingredients.push({
				value: item,
				display: capitalize(item)
			});
			self.ingredients = $filter('orderBy')(self.ingredients, 'display');
		} else {
			self.ingredients.splice(index, 1);
		}
		
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
		self.ingredients = loadAll();
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

	// Remove one of the ingredients input by user
	function removeIngredient(ing) {
		var index = self.output.indexOf(ing);
		self.output.splice(index, 1);
		updateIngredients(ing);
	}

	// Animation Control
	function moveUpMain() {
		self.moveUp = true;
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