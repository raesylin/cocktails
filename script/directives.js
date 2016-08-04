// REGISTER RECOMMENDATION PANEL DIRECTIVE
app.directive('recommendPanel', function() {
	return {
		restrict: 'C',
		templateUrl: 'pages/recommend-panel.html',
		replace: true,
		controller: 'recCtrl',
		controllerAs: 'rec'
	};
});

