/* global plupload */
/* global options */
angular.module('restApp').factory('uploadManager',function($rootScope, ADDRESS, $timeout) {

    var self = this;

	var uploadManager = {
        progress:0
    };

    console.log('Element', document.getElementById('button-test'));

    self.uploader = new plupload.Uploader({
        runtimes : 'html5,silverlight,html4',
        required_features: "send_browser_cookies",
        browse_button : 'button-test', // you can pass in id...
        chunk_size: '10240kb',
        url : ADDRESS.root + '/file',
        multipart_params:{},
        // Flash settings
        flash_swf_url : 'bower_components/plupload/js/Moxie.swf',
        // Silverlight settings
        silverlight_xap_url : 'bower_components/plupload/js/Moxie.xap'

    });

    self.uploader.init();

    uploadManager.plupload = self.uploader;

    /**
     * The method add files to Plupload and  call plupload.start
     * @param files - the files that was dropped
     * @param options - ?
     */
    uploadManager.addFiles = function(files, options){

        var name = "";
        var file = "";

        options = (typeof options === 'undefined') ? {} : options;
        console.log('UploadMenager AddFiles:', options);

        for(var i=0;i< files.length;i++){
            name = files[i].name;
            file = files[i];

            file.options = options;
            self.uploader.addFile(file);
        }

        self.uploader.start();
    };

    /**
     * Event listener - UploadProgress
     * While a file is begin updated, this event show a file progress.
     * $broadcast send file progress to Controller.
     * When file is updated ( progress = 100) is removed from uploader.files
     */

    self.uploader.bind('UploadProgress',function(up, file) {

        console.log('Progress', file.percent);
        $rootScope.$broadcast('filePercent',  file.percent);


        if(file.percent === 100){
            $timeout(function(){
                self.uploader.removeFile(file);
            },500);

        }
    });

    /**
     * Event listener - FilesAdded
     * Fires after files were added to the queue
     */
    self.uploader.bind('FilesAdded', function(up, files){
      //  console.log('Data FilesAdded', up);
      //  console.log('Data FilesAdded', files);
    });

    /**
     * Listener for $broadcast
     * call from controller to remove the file from the queueq
     */
    $rootScope.$on('fileRemove', function(event, data){
        console.log('uploader', data);

        self.uploader.splice(data,1);


    });

    self.uploader.bind('ChunkUploaded', function(up, file, info) {
        console.log('Up', up);
        console.log('File', file);
        console.log('info', info);
    });


	return uploadManager;
});
