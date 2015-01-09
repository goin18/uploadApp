/* global plupload */
angular.module('restApp').controller('PluploadCtrl',function($scope, ADDRESS){

    $scope.url = ADDRESS.root;
    $scope.url = $scope.url.substring(7)+'/file';
    var uploader = new plupload.Uploader({
       browse_button:'browse', //id of DOM element
       url: 'http://'+ $scope.url,
        type:'image/jpeg',
        name:'slika2'

    });

    uploader.init();  // da dejasnko inicializiramo

    uploader.bind('FilesAdded', function(up, files){
        var html = '';
        plupload.each(files, function(file) {
            html += '<li id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ') <b></b></li>';
        });
        document.getElementById('filelist').innerHTML += html;
    });

    uploader.bind('UploadProgress', function(up, file) {
        document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
    });

    uploader.bind('Error', function(up, err) {
        document.getElementById('console').innerHTML += "\nError #" + err.code + ": " + err.message;
    });

    document.getElementById('start-upload').onclick = function() {
        uploader.start();
    };

    uploader.bind('FileUploaded', function(up, files, response) {
        console.log('Done message2',response);

    });


});
