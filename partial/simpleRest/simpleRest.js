/* global confirm */

angular.module('restApp').controller('SimplerestCtrl',function($scope, restService){

    console.log('Rest: ', restService.data.users);
    $scope.users = restService.data.users;
    $scope.putText = 'Down';
    $scope.putShow = false;
    $scope.newText = '+';
    $scope.newShow = false;

    //function delete
    $scope.deleteUser = function(id){
        var c = confirm('Delete confirm');
        if(c){
            restService.deleteUser(id, function(){
               console.log('Izvede se v pol');
                for(var i=0;i< $scope.users.length;i++){
                    var user = $scope.users[i];

                    if(user._id === id){
                        $scope.users.splice(i,1);
                    }
                }
            });
        }
    };

    //showPut
    $scope.putMetoda = function(id, name){
        var data = {
            id: id,
            name: name
        };

        var c = confirm('Put confirm');
        if(c){
            restService.putUser(data, function(cbuser){
               for(var i = 0; i < $scope.users.length; i++){
                   var user = $scope.users[i];

                   if(user.id === id){
                       $scope.users.replace(cbuser);
                   }
               }
            });
        }
    };

    $scope.newUser = function(){
        var data = {
          name : $scope.newName
        };

        restService.postUser(data, function(cbNewUser){
           $scope.users.push(cbNewUser);
        });

    };
});
