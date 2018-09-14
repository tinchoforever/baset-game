'use strict';

angular.module('initApp')
.directive('cabaChart', function() {
    return {
        restrict: 'E',
        replace: false,
        scope: {
          container: '=container',
          highlight: '=highlight',
          colorPalette: '=data'
        },
        controller: function($scope, $http) {

          $scope.id = $scope.container + '-directive'
          $scope.chart = null;

          function render(){

              console.log('render');
              console.log($scope.highlight);
              console.log($scope.colorPalette);
              reRender($scope.id, $scope.colorPalette, $scope.highlight);
          }

          setTimeout(function(){
            render();
          },1000);

          var id;
          $(window).resize(function() {
            clearTimeout(id);
            id = setTimeout(function(){
              if($scope.chart){
                render();

              }
            }, 500);
    });


        }, 
        template: '<div id="{{id}}"></div>'
    };

});

var reRender = function(renderId, data,highlight){



d3.xml("images/main.svg").mimeType("image/svg+xml").get(function(error, xml) {
        if (error) throw error;
        d3.select("#" + renderId).node().appendChild(xml.documentElement);
        d3.select("#" + renderId + " svg")
          .attr('width','100%')
          // .attr('height', '40vh');

        if (highlight){
          highlight = highlight.replace(' ', '_');
          d3.selectAll('svg path.st1').transition()
            .duration(500).style("fill", "#d1d1d1")
          d3.select('svg #' + highlight.toUpperCase())
              .transition().duration(1200)
              .style("fill", "#19c3e3")
            
        }
        if( window.highlightScope){
        d3.selectAll('svg path.st1').on('click',function(d){
          // d3.selectAll('svg path.st1').transition()
          //   .duration(500).style("fill", "#d1d1d1")
          // d3.select(this)
          //    .transition().duration(1200)
          //     .style("fill", "#19c3e3")
          window.highlightScope(d3.select(this).attr('id'));
        });
      }
      if(data){
        var max = d3.max(data,function(d){ return d.values.length});
        var min = d3.min(data,function(d){ return d.values.length});
        var color = d3.scale.linear().domain([min,max])
          .range([d3.rgb("#dcf9ff"), d3.rgb('#19c3e3')]);
        data.map(function(d){
          var k = d.key.toLowerCase().replace(' ','_').replace(' ','_').toUpperCase();
          if (k!=''){
            d3.select('svg path.st1#'+k).style('fill', function(x){
              return color(d.values.length);
            })
          }
        })
      }

  });


};



window.reloadGraph = function(data,highlight){
    // mainDataset = prepareData(data);
    // loadDataset(data);
    var max = d3.max(data,function(d){ return d.values.length});
    var min = d3.min(data,function(d){ return d.values.length});
    var color = d3.scale.linear().domain([min,max])
      .range([d3.rgb("#dcf9ff"), d3.rgb('#19c3e3')]);
    data.map(function(d){
      var k = d.key.toLowerCase().replace(' ','_').replace(' ','_').toUpperCase();
      if (k!=''){
        d3.select('svg path.st1#'+k).style('fill', function(d){
          return color(d.values.length);
        })
      }
    })

    if (highlight){
          highlight = highlight.replace(' ', '_');
          d3.selectAll('svg path.st1').transition()
            .duration(500).style("fill", "#d1d1d1")
          d3.select('svg #' + highlight.toUpperCase())
              .transition().duration(800)
              .style("fill", "#19c3e3")
        }
  }