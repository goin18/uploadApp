angular.module('restApp').controller('AngularCtrl',function($scope, $timeout){

    $scope.marko = {
        name:'Marko',
        address:'Kampel 98'
    };

    $scope.igor = {
        name:'Igor',
        address:'Ljubjana X'
    };

    $scope.voja = {name:'Voja', address:'Neznan'};

    $scope.test1 = { text: 'To je moj text'};

    $scope.name = 'XName';
    $scope.hideDialog = function(){
        $scope.dialogIsHidden = true;
        $timeout(function(){
            $scope.dialogIsHidden = false;
        }, 2000);
    };

   // $scope.format = 'M/d/yy h:mm:ss a';

});

