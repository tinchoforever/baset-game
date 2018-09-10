'use strict';

angular.module('initApp')
  .controller('endController', function ($rootScope, $scope,$location) {
    var url = 'data.csv';

    if(!$rootScope.currentGame){
  		$location.path('/');
  	}

});