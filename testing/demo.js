(function () {
  'use strict';
  angular
      .module('autocompleteDemo', ['ngMaterial'])
      .controller('DemoCtrl', DemoCtrl);
  function DemoCtrl ($timeout, $q, $log) {
    var self = this;
    self.simulateQuery = false;
    self.isDisabled    = false;
    self.noCache = true;
    // list of `state` value/display objects
    self.ingredients   = loadAll();
    self.querySearch   = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;
    self.output = [];
    // self.newState = newState;
    // function newState(state) {
    //   alert("Sorry! You'll need to create a Constituion for " + state + " first!");
    // }
    // ******************************
    // Internal methods
    // ******************************
    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch (query) {
      var results = query ? self.ingredients.filter( createFilterFor(query) ) : self.ingredients,
          deferred;
      // if (self.simulateQuery) {
      //   deferred = $q.defer();
      //   $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
      //   return deferred.promise;
      // } else {
      return results;
      // }
    }

    function searchTextChange(text) {
      // $log.info('Text changed to ' + text);
    }

    function selectedItemChange(item) {

    	// var sanitizedItem = item || null;
    	if (item !== null && item !== undefined) {
        	self.output.push(item.value);
        	updateIngredients(item); 
      	}
    }

    // REMOVE SELECTED ITEM FROM SUGGEST LIST
	function updateIngredients(item) {
		var index = self.ingredients.indexOf(item);
		self.ingredients.splice(index, 1);
   }

    /**
     * Build `states` list of key/value pairs
     */
    function loadAll() {
      var allIngredients = 'vodka, orange juice, lime juice, coffee, tequila, rum';
      return allIngredients.split(/, +/g).map( function (ing) {
        return {
          value: ing.toLowerCase(),
          display: ing
        };
      });
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
  }
})();
