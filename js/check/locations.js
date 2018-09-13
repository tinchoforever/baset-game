'use strict';

angular.module('initApp')
  .controller('locationsController',function ($rootScope, $scope,$location) {

 
  	$scope.changeOption = function(){
  		reloadGraph($scope.selectedBarrio, $scope.selectedBarrio.key);
  	}
});