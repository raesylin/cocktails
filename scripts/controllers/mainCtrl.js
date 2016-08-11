app.controller('mainCtrl', ['$scope', '$location', '$compile', '$filter', 'dataService', function($scope, $location, $compile, $filter, dataService){
	
	var self = this;

	/*================================================
	=            md-autocomplete settings            =
	================================================*/
	
	self.simulateQuery = false;
	self.isDisabled = false;
	self.noCache = true;
	self.querySearch = querySearch;
	self.selectedItemChange = selectedItemChange;
	self.searchTextChange = searchTextChange;
	/* Selected ingredient from dropdown menu */
	self.selectedItem = null;
	
	/*=====  End of md-autocomplete settings  ======*/

	/*==================================================================
	=            mainCtrl storages and function declaration            =
	==================================================================*/
	
	self.clearIngredients = clearIngredients;
	self.submit = submit;
	self.focus = focus;
	self.removeIngredient = removeIngredient;

	/*----------  local storages  ----------*/

	/* Suggested ingredients list for autocomplete dropdown menu */
	self.suggestedIngredients = [];
	
	
	/* First tier cocktail list */
	self.recommendCocktails = [];
	/* Selected cocktail */
	
	
	/*=====  End of mainCtrl storages and function declaration  ======*/
	
	/*=============================================
	=            UI Controll variables            =
	=============================================*/
	
	self.moveUp = false;
	self.moveUpMain = moveUpMain;
	
	/*=====  End of UI Controll variables  ======*/


	/**
	 *
	 * INTERNAL FUNCTIONS
	 *
	 */
	
	/*----------  Dropdown menu functions  ----------*/
	
	function searchTextChange(text) {
		// do nothing
	}

	/**
	 * Execute when select one ingredient from dropdown box
	 * @param  {string} item selected object from dropdown box
	 */
	function selectedItemChange(item) {

		if (item) {
			$scope.collection.userIngredients.push(item);
			/**
			 * Remove this ingredient from local suggested ingredient list
			 */
			updateIngredients(item);
			self.searchText = null;
		}

	}

	/**
	 * Update suggested ingredient list in dropdown menu after one of the ingredients is selected, or after the selected ingredient is cleared
	 * @param  {string} item ingredient
	 */
	function updateIngredients(item) {
		var index = self.suggestedIngredients.indexOf(item);
		if (index === -1) {
			/* Add it back to the suggestion list */
			
			self.suggestedIngredients.push(item);
			self.suggestedIngredients.sort();
		} else {
			/* Remove from suggestion list */
			
			self.suggestedIngredients.splice(index, 1);
		}
	}

	function createFilterFor(query) {
		var lowercaseQuery = angular.lowercase(query);
		return function filterFn(item) {
			return (item.indexOf(lowercaseQuery) >= 0);
		}
	}

	function querySearch(query) {
		var results = query ? self.suggestedIngredients.filter(createFilterFor(query)) : self.suggestedIngredients, deferred;
		return results;
	}

	/*----------  Form functions  ----------*/
	/**
	 * Clear all user input, reload suggestion list, remove recommendation panel content
	 */
	function clearIngredients() {
		$scope.collection.userIngredients = [];
		self.selectedItem = null;
		self.searchText = '';
		self.suggestedIngredients = $scope.collection.allIngredients.slice(0);
		clearRecommendPanel();
	}

	/**
	 * Compile and Show recommendation panel 
	 */
	function submit() {
		clearRecommendPanel();
		var compiledHTML = $compile('<div class="recommend-panel"></div>')($scope);
		showRecommendPanel(compiledHTML);
	} 

	/**
	 * Execute when cross of user ingredient is clicked; remove this ingredient from userIngerdients list, put it back to suggestion list
	 * @param  {string} item ingredient to remove 
	 */
	function removeIngredient(item) {
		var index = $scope.collection.userIngredients.indexOf(item);
		$scope.collection.userIngredients.splice(index, 1);
		updateIngredients(item);
	}

	/*----------  UI Control functions ----------*/
	
	function clearRecommendPanel() {
		jQuery('#panel').html('');
	}

	function showRecommendPanel(html) {
		jQuery('#panel').html(html);
	}

	function moveUpMain() {
		self.moveUp = true;
	}

	/*----------  Data Processing functions  ----------*/
	

	/**
	 * Load ingredient list from input array of cocktail objects
	 * @param  {array} data with cocktail objects
	 * @return {[type]}      [description]
	 */
	function loadIngredients(data) {
		angular.forEach(data, function(cocktail) {
			angular.forEach(cocktail.ingredients, function(ing) {
				if ($scope.collection.allIngredients.indexOf(ing) < 0) {
					/**
					 * Populate the global ingredient list
					 */
					$scope.collection.allIngredients.push(ing);
				}
			});
		});

		$scope.collection.allIngredients.sort();

	}

	


	function onSuccess(data) {
		/**
		 * Set global storage to data retrieved from api or database
		 */
		$scope.collection.cocktails = data;
		/**
		 * Populate ingredient list (both global and local)
		 */
		loadIngredients(data);
		self.suggestedIngredients = $scope.collection.allIngredients.slice(0);
		

	}

	function onError(reason) {
		console.log("Could not fetch data because: " + reason);
	}

	dataService.getCocktails().then(onSuccess, onError);

}]);