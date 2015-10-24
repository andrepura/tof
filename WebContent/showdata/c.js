app.register.controller('showdata',['$scope','$http' , function($scope,$http){
	
	$scope.people = [];
	$scope.search=function(q)
	{
		if(!q)
		{
			$scope.people = [];
			return;
		}
		if(q.length<3)
		{
			$scope.people = [];
			return;
		}
		
		$http({
			method : 'GET',
			url :  '../tof/search?q=' + encodeURI(q)
			
		}).then(function(response) {
			console.dir(response);
			$scope.people=response.data;
		}, function(error) {
			$scope.people = [];
			console.dir(error);
		});
		
	}
}]);