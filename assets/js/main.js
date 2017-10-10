(function() {
	require.config({
		baseUrl: '/assets/js',
	});

	require([
		'jquery',
		'TweenMax',
		'TimelineMax',
		'ScrollToPlugin',
		'pace',
		'mresize',
	],function(Pace){
		require(['stage'])
	});
})();