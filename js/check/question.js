'use strict';

angular.module('initApp')
  .controller('questionController', function ($rootScope, $scope,$location) {

  	 if(!$rootScope.currentGame){
  		$location.path('/');
  	}

}); 