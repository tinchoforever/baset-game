'use strict';

angular.module('initApp')
  .controller('endController', function ($rootScope, $scope,$location) {
    var url = 'data.csv';

    if(!$rootScope.currentGame){
  		$location.path('/');
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
  	var url = 'data/baset.csv';

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

        var orderUpperNest = function(a,b){
		        	return b.values.length - a.values.length ;
		        };
        var orderAlphabetNest = function(a,b){
              return a.key - b.key;
            };
        $rootScope.comunas = d3.nest()
		        .key(function(d) {
		          
		          return toTitleCase(d.COMUNA);
		        })
		        .entries(data)
		        .sort(orderUpperNest);
		$rootScope.barrios = d3.nest()
		        .key(function(d) {
		          
		          return toTitleCase(d.BARRIO);
		        })
		        .entries(data)
		        .sort(orderAlphabetNest);

    $rootScope.barrios.map(function(b){
      b.proyectos = d3.nest()
            .key(function(d) {
              
              return toTitleCase(d.TITULO_PROYECTO);
            })
            .entries(b.values)
            .sort(orderUpperNest);
    });

    console.log($rootScope.barrios);
    $rootScope.allProd = d3.nest()
            .key(function(d) {
              
              return toTitleCase(d.TITULO_PROYECTO);
            })
            .entries(data)
            .sort(orderUpperNest);
		$rootScope.produccionesFilter = d3.nest()
		        .key(function(d) {
		          
		          return toTitleCase(d.TITULO_PROYECTO);
		        })
		        .entries($rootScope.readyToCheck)
		        .sort(orderUpperNest);
        $rootScope.netofechas = d3.map(data, function(d){return d.FECHA_RODAJE;}).keys();
        $rootScope.netoPeriodo = d3.map(data, function(d){return d.PERIODO;}).keys();
        $rootScope.netoProducciones = d3.map(data, function(d){return d.TITULO_PROYECTO.toLowerCase();}).keys();
        $rootScope.netoLocaciones = d3.map(data, function(d){return d.DIRECCION;}).keys();
        $rootScope.producciones = d3.map($rootScope.readyToCheck, function(d){return d.TITULO_PROYECTO;}).keys();
        

        $rootScope.stats =[];
        $rootScope.stats.push({
          number: $rootScope.netoPeriodo.length,
          icon: 'calendar-alt',
          label: 'Años'
        });
        $rootScope.stats.push({
          number: $rootScope.netofechas.length,
          icon: 'video',
          label: 'Días de Filmación'
        });
        $rootScope.stats.push({
          number: $rootScope.netoVideoClips.length,
          icon: 'music',
          label: 'Videoclips'
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