'use strict';

angular.module('initApp')
  .controller('locationsController',function ($rootScope, $scope,$location) {

 
  	$scope.changeOption = function(){
  		reloadGraph($scope.selectedBarrio, $scope.selectedBarrio.key);
  	}
  	$scope.highlightPoint = function(c){
  		c = c.replace('_',' ').replace('_',' ');
  		$scope.$apply(function(){
  			var f = $scope.barrios.filter(function(b){
  				return b.key.toUpperCase() === c;
  			});
  			if (f.length === 0){
  				alert('no existe ' + c);
  			}
  			$scope.selectedBarrio = f[0];
  		});
  	};
  	window.highlightScope = $scope.highlightPoint;
});