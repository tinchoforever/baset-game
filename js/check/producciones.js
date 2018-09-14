'use strict';

angular.module('initApp')
  .controller('produccionesController',function ($rootScope, $scope,$location) {

 	if(!$rootScope.checks){
      $location.path('/stats');
    }


});