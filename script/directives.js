app.directive('recommendPanel', function() {
	return {
		restrict: 'C',
		templateUrl: 'pages/recommend.html',
		replace: true,
		controller: 'recCtrl',
		controllerAs: 'rec'
	};
});