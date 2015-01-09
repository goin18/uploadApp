angular.module('restApp', ['ui.bootstrap', 'ui.utils', 'ui.router', 'ngAnimate', 'constant', 'ngDragDrop']);

angular.module('restApp').config(function($stateProvider, $urlRouterProvider) {

    /* Add New States Above */
    $stateProvider.state('simpleRest',{
        url:'/simpleRest',
        templateUrl: 'partial/simpleRest/simpleRest.html',
        controller:'SimplerestCtrl',
        resolve:{
            users:function(restService){
                return restService.getAll();
            }
        }
    });

    /* Parent Property using State Name String */
    $stateProvider.state('plupload',{
        url:'/plupload',
        templateUrl: 'partial/plupload/plupload.html',
        controller:'PluploadCtrl'
    }).state('fileManager',{
        url:'/fileManager',
        templateUrl: 'partial/fileManager/fileManager.html',
        controller:'FilemanagerCtrl'
    });

/*
    $stateProvider.state('fileManager',{
        url:'/fileManager',
        templateUrl: 'partial/fileManager/fileManager.html',
        controller:'FilemanagerCtrl'
    });
*/

    $stateProvider.state('angular',{
        url:'/angular',
        templateUrl: 'partial/angular/angular.html',
        controller:'AngularCtrl',
        onExit:function(){
            console.log('Exit ');
        }
    });

    $urlRouterProvider.otherwise('/angular');

});

angular.module('restApp').run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});
