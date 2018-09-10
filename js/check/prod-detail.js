'use strict';

angular.module('initApp')
  .controller('prodDetailController',function ($routeParams, $rootScope, $scope,$location) {

 	$scope.produccion = $routeParams.name;

 	var filtered = [];
      $rootScope.produccionesFilter.map(function(p){
      		if (p.key.toLowerCase() == $scope.produccion.toLowerCase()){
	          $scope.temas = p;
	      }
      })
        
       
});