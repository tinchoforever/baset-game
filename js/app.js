'use strict';

angular.module('initApp',['ngRoute', 'ngAnimate'])
.config(['$compileProvider', function($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|whatsapp|file|tel):/);
  }])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/check/main.html',
        controller: 'mainController'
      })
       .when('/pregunta', {
        templateUrl: 'views/check/question.html',
        controller: 'questionController'
      })
        .when('/respuesta', {
        templateUrl: 'views/check/answer.html',
        controller: 'questionController'
      })
      .when('/fin', {
        templateUrl: 'views/check/end.html',
        controller: 'endController'
      })
      .when('/stats', {
        templateUrl: 'views/check/stats.html',
        controller: 'statsController'
      })
      .when('/locations', {
        templateUrl: 'views/check/locations.html',
        controller: 'locationsController'
      })
       .when('/producciones', {
        templateUrl: 'views/check/producciones.html',
        controller: 'produccionesController'
      })
});
 
new WOW().init();
              
/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}