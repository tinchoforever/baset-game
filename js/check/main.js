'use strict';

angular.module('initApp')
  .controller('mainController', function ($scope, $rootScope, $location) {
    var url = 'data/baset.csv';

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
      var filteredAnswers = $rootScope.barrios.filter(function(d){
        return d != $rootScope.currentCheck.BARRIO.toLowerCase();
      });
      var randomAnswers = getRandom(filteredAnswers,3);
      randomAnswers.push($rootScope.currentCheck.BARRIO.toLowerCase());
      
      $rootScope.possibleAnswers = shuffle(randomAnswers);
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
      
      var filteredAnswers = $rootScope.barrios.filter(function(d){
        return d != $rootScope.currentCheck.BARRIO.toLowerCase();
      });
      var randomAnswers = getRandom(filteredAnswers,3);
      randomAnswers.push($rootScope.currentCheck.BARRIO.toLowerCase());
      
      $rootScope.possibleAnswers = shuffle(randomAnswers);
      $location.path('pregunta');
    }

    $rootScope.responder = function(c){
      var res = $rootScope.currentCheck.BARRIO;

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

    var invalid = []
    invalid.push("Largometraje Con I.N.C.A.A.");
    invalid.push("Cine Publicitario");

    invalid.push("Estudiantes"); 
    invalid.push("Video Clip");
    invalid.push("Fotografia");
    invalid.push("Institucionales");
    invalid.push("Cortometraje");
    invalid.push("Documental");
    invalid.push("Largometraje Nacional");

    var valid = [];
    // valid.push("Programa Televisivo");
    // valid.push("Largometraje Nacional");
    valid.push("Largometraje");
    valid.push("Tv Ficcion");
    
  	

    d3.csv(url, function(data){
      $rootScope.$apply(function(){
        $rootScope.checks = data;
        $rootScope.readyToCheck = [];
        data.map(function(d){
            valid.map(function(m){
              if (d['TIPO_PRODUCCION'] == m)  {
                $rootScope.readyToCheck.push(d);    
              }
            });
        });
        $rootScope.barrios = d3.map($rootScope.readyToCheck, function(d){return d.BARRIO.toLowerCase();}).keys();
        $rootScope.comunas = d3.map($rootScope.readyToCheck, function(d){return d.COMUNA.toLowerCase();}).keys();
        $rootScope.producciones = d3.map($rootScope.readyToCheck, function(d){return d.TITULO_PROYECTO;}).keys();

        console.log($rootScope.barrios);
        console.log($rootScope.comunas);
        console.log($rootScope.producciones);
      });
    });

});