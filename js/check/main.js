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

    var invalid = [];
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
    valid.push("Largometraje");
    valid.push("Tv Ficcion");
    
    var tv = [];
    tv.push("Programa Televisivo");
    tv.push("Tv Ficcion");
  
    var movies = [];
    movies.push("Largometraje Con I.N.C.A.A.");
    movies.push("Largometraje Nacional");
    movies.push("Largometraje");

    $rootScope.videoClips = [];
    $rootScope.tv = [];
    $rootScope.movies = [];

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
            movies.map(function(m){
              if (d['TIPO_PRODUCCION'] == m)  {
                $rootScope.movies.push(d);    
              }
            });
            tv.map(function(m){
              if (d['TIPO_PRODUCCION'] == m)  {
                $rootScope.tv.push(d);    
              }
            });
            if (d.TIPO_PRODUCCION === 'Video Clip'){
              $rootScope.videoClips.push(d);
            }

        });
        
        data.map(function(d){
          
        });
        $rootScope.netoTV= d3.map($rootScope.tv, function(d){return d.TITULO_PROYECTO.toLowerCase();}).keys();
        $rootScope.netoVideoClips= d3.map($rootScope.videoClips, function(d){return d.TITULO_PROYECTO.toLowerCase();}).keys();
        $rootScope.netoMovies= d3.map($rootScope.movies, function(d){return d.TITULO_PROYECTO.toLowerCase();}).keys();
        $rootScope.barrios = d3.map($rootScope.readyToCheck, function(d){return d.BARRIO.toLowerCase();}).keys();
        $rootScope.comunas = d3.map($rootScope.readyToCheck, function(d){return d.COMUNA.toLowerCase();}).keys();
        $rootScope.netofechas = d3.map(data, function(d){return d.FECHA_RODAJE;}).keys();
        $rootScope.netoPeriodo = d3.map(data, function(d){return d.PERIODO;}).keys();
        $rootScope.netoProducciones = d3.map(data, function(d){return d.TITULO_PROYECTO;}).keys();
        $rootScope.netoLocaciones = d3.map(data, function(d){return d.DIRECCION;}).keys();
        $rootScope.producciones = d3.map($rootScope.readyToCheck, function(d){return d.TITULO_PROYECTO;}).keys();


        $rootScope.stats =[];
        $rootScope.stats.push({
          number: $rootScope.netoPeriodo.length,
          label: 'Años'
        });
        $rootScope.stats.push({
          number: $rootScope.netofechas.length,
          label: 'Dias de Filmacion'
        });
        $rootScope.stats.push({
          number: $rootScope.netoLocaciones.length,
          label: 'Locaciones'
        });
        $rootScope.stats.push({
          number: $rootScope.netoMovies.length,
          label: 'Películas'
        });
        $rootScope.stats.push({
          number: $rootScope.producciones.length,
          label: 'Programas de TV'
        }); 
        
        $rootScope.stats.push({
          number: $rootScope.videoClips.length,
          label: 'Video Clips'
        });
        
        
        console.log($rootScope.barrios);
        console.log($rootScope.comunas);
        console.log($rootScope.producciones);
      });
    });

});