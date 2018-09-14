'use strict';

angular.module('initApp')
  .controller('mainController', function ($scope, $rootScope, $location) {
    var url = 'data/baset.csv';
    var gameCount = 5;
    $rootScope.currentGame = {
      points:0,
      remaing: gameCount,
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
        remaing: gameCount,
        questions: shuffle($rootScope.readyToCheck).slice(0,gameCount)
      }
      $rootScope.currentCheck = $rootScope.currentGame.questions[$rootScope.currentGame.remaing-1];
      

      setBarrioQuestion();
      //Por Titulo de Produccion


      $rootScope.lastAnswer = {
        result : false,
      }

      $location.path('pregunta/barrio');

      
    }

    var setTitleQuestion = function(){
      //Por Titulo de Produccion
      var filteredAnswersTitulo = $rootScope.readyToCheck.filter(function(d){
        return d.BARRIO.toLowerCase() != $rootScope.currentCheck.BARRIO.toLowerCase()
        && d.TITULO_PROYECTO.toLowerCase() != $rootScope.currentCheck.TITULO_PROYECTO.toLowerCase();
      }).map(function(d){ return d.TITULO_PROYECTO; });

      var randomAnswersTitulo = getRandom(filteredAnswersTitulo,3);
      randomAnswersTitulo.push($rootScope.currentCheck.TITULO_PROYECTO.toLowerCase());
            
      $rootScope.currentBarrio = $rootScope.barriosFiltered.filter(function(d){
        if (d.key.toLowerCase() === $rootScope.currentCheck.BARRIO.toLowerCase()){
          return d;
        }
      })[0];

      $rootScope.currentTitle = $rootScope.produccionesFilter.filter(function(d){
        if (d.key.toLowerCase() === $rootScope.currentCheck.TITULO_PROYECTO.toLowerCase()){
          return d;
        }
      })[0];
      $rootScope.possibleAnswersTitulo = shuffle(randomAnswersTitulo);

    }
    var setCurrentCheck = function(){
      $rootScope.onQuestion = true;
      $rootScope.onAnswer = false;
      $rootScope.showResume = false;
      $rootScope.currentCheck = $rootScope.currentGame.questions[$rootScope.currentGame.remaing-1];

    }

    $rootScope.responder = function(c){
      $rootScope.currentCheck
      
      var res = $rootScope.currentCheck.BARRIO;

      $rootScope.currentCheck.tuRespuesta = c;
      $rootScope.lastAnswer.answer = c;
      $rootScope.lastAnswer.result = c.toLowerCase().trim() ===res.toLowerCase().trim();
      $rootScope.currentCheck.result=$rootScope.lastAnswer.result;
      if ($rootScope.lastAnswer.result){
        $rootScope.currentGame.points++;
      }
      $rootScope.onQuestion =false;
      $rootScope.onAnswer = true;
     
      $rootScope.currentGame.remaing--;
       if ($rootScope.currentGame.remaing == 0){
          $rootScope.gameFinish = true;
      }
      $location.path('respuesta/barrio');

    }
    $rootScope.responderTitle = function(c){
      var res = $rootScope.currentCheck.TITULO_PROYECTO;

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
      $location.path('respuesta/titulo');

    }
    $rootScope.nextQuestion = function(){
      setCurrentCheck();
      setTitleQuestion();
      //moveNext
      $location.path('pregunta/titulo');
    };
    var setBarrioQuestion = function(){
      //Por Barrio
      var filteredAnswersBarrio = $rootScope.barrios.filter(function(d){
        return d != $rootScope.currentCheck.BARRIO.toLowerCase();
      });

      var randomAnswersBarrio = getRandom(filteredAnswersBarrio,3);
      randomAnswersBarrio.push($rootScope.currentCheck.BARRIO.toLowerCase());
      
      $rootScope.currentBarrio = $rootScope.barriosFiltered.filter(function(d){
        if (d.key.toLowerCase() === $rootScope.currentCheck.BARRIO.toLowerCase()){
          return d;
        }
      })[0];

      $rootScope.currentTitle = $rootScope.produccionesFilter.filter(function(d){
        if (d.key.toLowerCase() === $rootScope.currentCheck.TITULO_PROYECTO.toLowerCase()){
          return d;
        }
      })[0];


      $rootScope.possibleAnswersBarrio = shuffle(randomAnswersBarrio);

    };

    $rootScope.nextQuestionBarrio = function(){
      setCurrentCheck();
      setBarrioQuestion();
      //moveNext
      $location.path('pregunta/barrio');
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

         var orderUpperNest = function(a,b){
              return b.values.length - a.values.length ;
            };
        $rootScope.barriosFiltered = d3.nest()
            .key(function(d) {
              
              return toTitleCase(d.BARRIO);
            })
            .entries(data)
            .sort(orderUpperNest);
    $rootScope.produccionesFilter = d3.nest()
            .key(function(d) {
              
              return toTitleCase(d.TITULO_PROYECTO);
            })
            .entries($rootScope.readyToCheck)
            .sort(orderUpperNest);
        $rootScope.all = data;
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
        console.log($rootScope.producciones);

        $rootScope.stats =[];
        $rootScope.stats.push({
          number: $rootScope.netoPeriodo.length,
          icon: 'calendar-alt',
          label: 'Años'
        });
        $rootScope.stats.push({
          number: $rootScope.netofechas.length,
          icon: 'video',
          label: 'Dias de Filmacion'
        });
        $rootScope.stats.push({
          number: $rootScope.netoVideoClips.length,
          icon: 'music',
          label: 'Video Clips'
        });
        $rootScope.stats.push({
          number: $rootScope.netoLocaciones.length,
          icon: 'map-marker-alt',
          label: 'Locaciones'
        });
        $rootScope.stats.push({
          number: $rootScope.netoMovies.length,
          icon: 'film',
          label: 'Películas'
        });
        $rootScope.stats.push({
          number: $rootScope.producciones.length,
          icon:'tv',
          label: 'Programas de TV'
        }); 
        
        
        
        
      });
    });

});