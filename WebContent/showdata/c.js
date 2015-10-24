app.register.controller('showdata',['$scope','$http' , function($scope,$http){
	
	$scope.people = [];
	$scope.search=function(q)
	{
		console.log(q);
		
		$http({
			method : 'GET',
			url :  '../tof/search?q=' + encodeURI(q)
			
		}).then(function(response) {
			console.dir(response);
			$scope.people=response.data;
		}, function(error) {
			if (pwd = 'admin')
				$scope.uid = 13;
			console.dir(error);
		});
		
	}
}]);