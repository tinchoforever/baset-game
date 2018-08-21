'use strict';

angular.module('initApp')
  .controller('mainController', function ($scope, $rootScope, $location) {
    var url = 'data.csv';

    $rootScope.currentGame = {
      points:0,
      remaing: 5,
    }
    $rootScope.lastAnswer = {
      result : false,
    }
    
    $rootScope.finishGame = function(){
      $rootScope.onQuestion = false;
      $rootScope.onAnswer = false;
      $rootScope.showResume = true;
      $location.path('fin');
    }
    $rootScope.startGame = function(){
      
      $rootScope.gameFinish = false;
      
      $rootScope.currentGame = {
        points:0,
        remaing: 5,
        questions: shuffle($rootScope.readyToCheck).slice(0,5)
      }
      $rootScope.currentCheck = $rootScope.currentGame.questions[$rootScope.currentGame.remaing-1];
    
      $rootScope.lastAnswer = {
        result : false,
      }
      $location.path('pregunta');

      
    }
    $rootScope.nextQuestion = function(){
      $rootScope.onQuestion = true;
      $rootScope.onAnswer = false;
      $rootScope.showResume = false;
      $rootScope.currentCheck = $rootScope.currentGame.questions[$rootScope.currentGame.remaing-1];
      $location.path('pregunta');
    }

    $rootScope.responder = function(c){
      var res = $rootScope.currentCheck['Resultado chequeo'];

      $rootScope.currentCheck.tuRespuesta = c;
      $rootScope.lastAnswer.answer = c;
      $rootScope.lastAnswer.result = c.toLowerCase().trim() ===res.toLowerCase().trim();
      if ($rootScope.lastAnswer.result){
        $rootScope.currentGame.points++;
      }
      $rootScope.onQuestion =false;
      $rootScope.onAnswer = true;
     
      $rootScope.currentGame.remaing--;
       if ($rootScope.currentGame.remaing == 0){
          $rootScope.gameFinish = true;
      }
      $location.path('respuesta');

    }
  	d3.csv(url, function(data){
      $rootScope.$apply(function(){
        $rootScope.checks = data;
        $rootScope.readyToCheck = [];
        data.map(function(d){
          if (d['Resultado chequeo'] != ''){
            $rootScope.readyToCheck.push(d);
          }
        });
        
       
      });
    });

});