app.service('dataService', ['$http', function($http){
	
	var self = this;
	
	/**
	 * Get complete cocktail list from api or database
	 * @return {array} api response which should be complete list of cocktail objects
	 */
	this.getCocktails = function() {

		return $http.get('api/data.json')
			.then(function(response) {

				return response.data;

			}, function(error) {

				console.log(error);

			});

	};


}]);