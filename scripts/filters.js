/**
 * Capitalize string (true: every word, false: only the first word)
 */
app.filter('capitalize', function() {
	return function(input, all) {
		var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
		return (!!input) ? input.replace(reg, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
    };
})
/**
 * Navigate through the cocktail list and return the cocktail objects that contains one of the ingredients 
 * Usage (html): original | cocktailFilter:filterBy
 * Usage (JavaScript): $filter("cocktailFilter")(original, filterBy)
 * @return {array}   a selection of cocktails of "original" filtered by "filterBy"
 */
.filter('cocktailFilter', function() {
	return function(original, filterBy) {

		var result = [];

		/**
		 * Returns true if haystack contains any one of the elements of arr
		 * @param  {array} haystack array to be examined
		 * @param  {array} arr      array with examining criteria
		 * @return {boolean}          return true if haystack contains any one of the elements of arr
		 */
		var containsOne = function(haystack, arr) {
			return arr.some(function(v) {
				return haystack.indexOf(v) >= 0;
			});
		};
	
		angular.forEach(original, function(cocktail) {
			if (containsOne(cocktail.ingredients, filterBy)) {
				result.push(cocktail);
			}
		});

		return result;
	};
});
