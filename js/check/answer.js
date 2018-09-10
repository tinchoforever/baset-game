'use strict';

angular.module('initApp')
  .controller('answerController',function ($rootScope, $scope,$location) {

  	if(!$rootScope.currentGame){
  		$location.path('/');
  	}

});