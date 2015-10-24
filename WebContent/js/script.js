
var app = null;

init = function() {
	console.log('init');
	app = angular.module('TofApp', [ 'ngAnimate', 'ngAria', 'ngMaterial',
			'ngRoute' ]);

	app.controller('AppCtrl', [ '$scope', '$mdSidenav', '$http', '$location',
			function($scope, $mdSidenav, $http, $location) {
				$scope.toggleSidenav = function(menuId) {
					$mdSidenav(menuId).toggle();
				};
				console.log('sdfsdf');

				$scope.uid = null
				$scope.login = function(user, pwd) {
					$http({
						method : 'POST',
						url : '../tof/user.login',
						data : $.param({
							username : user,
							password : pwd
						})
					}).then(function successCallback(response) {
						console.dir(response);
						$scope.uid = 12;
					}, function errorCallback(error) {
						if (pwd = 'admin')
							$scope.uid = 13;
						console.dir(error);
					});
				};

			} ]);

	app.config(function($controllerProvider, $compileProvider, $filterProvider,
			$provide) {
		app.register = {
			controller : $controllerProvider.register,
			directive : $compileProvider.directive,
			filter : $filterProvider.register,
			factory : $provide.factory,
			service : $provide.service
		};
	});

	app.config(function($mdThemingProvider) {
		$mdThemingProvider.theme('default').primaryPalette('grey')
				.accentPalette('yellow');
	});

	app.config([
			'$routeProvider',
			'$locationProvider',

			function($routeProvider, $locationProvider) {

				$routeProvider.

				when('/', {
					templateUrl : 'home.html'
				}).when(
						'/:plugin',
						{

							templateUrl : function(rd) {
								return rd.plugin + '/v.html';
							},

							resolve : {
								load : function($q, $route, $rootScope) {
									var deferred = $q.defer();

									var dependencies = [ '../'
											+ $route.current.params.plugin
											+ '/c.js' ];

									console.dir(dependencies);

									require(dependencies, function() {
										$rootScope.$apply(function() {
											deferred.resolve();
										});
									});

									return deferred.promise;
								}
							}
						})

				.otherwise({
					redirectTo : '/'
				});

				$locationProvider.html5Mode({
					enabled : false,
					requireBase : false
				});

			}

	]);

	angular.element(document).ready(function() {
		angular.bootstrap(document, [ 'TofApp' ]);
	});
}

loadLibs = function() {
	console.log('libs');
	require([ '../js/angular-route.min.js', '../js/angular-animate.min.js',
			'../js/angular-aria.min.js', '../js/angular-messages.min.js',
			'../js/angular-material.min.js', ], init);

};

window.onload = function() {
	console.log('jojo');
	require([ '../js/angular.min.js', '../js/jquery-2.1.4.js', ], loadLibs);

};
