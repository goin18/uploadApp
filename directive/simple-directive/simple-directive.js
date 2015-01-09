angular.module('restApp').directive('simpleDirective', function($interval, dateFilter, $document) {
	/*return {
		restrict: 'E',
		replace: true,
		scope: {

		},
		templateUrl: 'directive/simple-directive/simple-directive.html',
		link: function(scope, element, attrs, fn) {


		}
	};*/

/*
    return{
        restrict: 'AE',
      /*  templateUrl: function(elem, attr){
            console.log('Directive Elem:', elem);
            console.log('Directive Attr:',attr);
            return 'directive/simple-directive/customer-'+attr.type+'.html'
        }*/
  //      transclude: true,
  //      templateUrl: 'directive/simple-directive/simple-directive.html',
        /*scope:{
            voja:'=',
            customerInfo: '=info'
        }*/
   /* };
*/
/*
    return{
        restrict:'AE',
        link:function(scope, element, attrs){
            var format, timeoutId;

            function updateTime(){
                var napis = 'Se neki';
                element.text(dateFilter(new Date(), format) + 'To je cas!! '+ napis);
            }
            console.log('Direcctive Element:', element);
            console.log('Directive Attrs:', attrs );

            scope.$watch(attrs.simpleDirective, function(value){
               format = value;
                updateTime();
            });

            element.on('$destroy', function(){
               $interval.cancel(timeoutId);
            });

            timeoutId = $interval(function(){
                updateTime();
            }, 1000);
        }
    };*/
/*
    return{
        restrict:'A',
        transclude:true,
        scope:{
            close:'&blaKarneki'
        },
        templateUrl: 'directive/simple-directive/simple-directive.html'
    }

    */

    return {
        scope:{
            marko:"="
        },
        link: function(scope,element, attrs){

            var startX = 0, startY= 0, x= 0, y=0;

            element.css({
                position:'relative',
                border: '1px solid red',
                backgroundColor:'lightgrey',
                cursor:'pointer'
            });

            element.on('mousedown', function(event){
                event.preventDefault();
                startX = event.pageX - x;
                startY = event.pageY - y;
                $document.on('mousemove',mousemove);
                $document.on('mouseup', mouseup);
            });

            function mousemove(event){
                y = event.pageY - startY;
                x = event.pageX - startX;
                element.css({
                   top: y +'px',
                    left: x + 'px'
                });
            }

            function mouseup(){
                $document.off('mousemove', mousemove);
                $document.off('mouseup', mouseup);
            }

            element.on('click', function(){
               console.log('Prislo je do klika', attrs.marko);
                console.log('Prislo je do klika', scope.igor);
            });

            element.on('doubleclick', function(){
               console.log('Dvojni klik');
            });
        }

    };
}).directive('myTabs', function(){
    return{
        restrict:'E',
        transclude: true,
        scope:{},
        controller: function($scope){
            var panes = $scope.panes = [];

            $scope.select = function(pane){
                angular.forEach(panes, function(pane){
                    pane.selected = false;
                });
                pane.selected = true;
            };

            this.addPane = function(pane){
                if (panes.length === 0) {
                    $scope.select(pane);
                }

                pane.push(pane);
            };
        },
        templateUrl:'directive/simple-directive/my-tabs.html'
    };
}).directive('myPane', function(){
    return {
        require:'^myTabs',
        restrict:'E',
        transclude:true,
        scope:{
            title:'@'
        },
        link:function(scope, element, attrs, tabsCtrl){
            tabsCtrl.addPane(scope);
        },
        templateUrl:'directive/simple-directive/my-pane.html'
    };
});
