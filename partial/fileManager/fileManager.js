/* global mOxie */
angular.module('restApp').controller('FilemanagerCtrl',function($scope, $rootScope, uploadManager, $timeout){

    $scope.list1 = {title: 'AngularJS - Drag Me'};
    $scope.list2 = {};


    /**
     * getting files from plupload Array
     */
    $scope.files = uploadManager.plupload.files;

    $scope.fileOptions = {
        onFilesAdded : function (files){
            uploadManager.addFiles(files);
      }
    };
    /**
     * Get data from UploadProgress
     * Listener for $broadcast
     */
    $scope.$on('filePercent', function(event, data){
        $scope.progress = data;
        $scope.$apply();
    });

    /**
     *
     * @param index - position in plupload.files
     * init $broadcast for fileRemuve
     */
    $scope.removeFromUploading = function(index){
        $rootScope.$broadcast('fileRemove', index );
    };

});

