/* global mOxie */
angular.module('restApp').directive('uploadBox', function() {
	return {
        /**
         * Specific for directive
         */
		restrict: 'A',
		replace: true,
		scope: {
            tableFiles: '=',
            remove:'&',
            file:'=',
            uploadBox:'&'
		},
		templateUrl: 'directive/uploadBox/uploadBox.html',
		link: function(scope, element) {

            /**
             * create the element and show it on the screen
             */
            var options = scope.uploadBox();
            console.log('Link: ', scope.uploadBox());
            var box = element.css({
                border: '1px solid black',
                height: '100px'
            });

            element.append(box);

            var fileDrop = new mOxie.FileDrop({
                runtime_order : 'html5,flash,silverlight,html4',
                container:box,
                accept: [
                    {title : "Image files", extensions : "jpg,gif,png"},
                    {title : "PDF files", extensions: "pdf"},
                    {title : "Documents", extensions: "doc,odt,odf,calc,pages"},
                ]
            });

            var entered = false;

            /**
             * Drag a file over the element
             */
            $(element).on('dragover', function(e){
                console.info('On the element');
            });


            /**
             * Drag a file away from the element
             */
            $(element).on('dragleave', function(e){
                console.info('leave');
            });

            /**
             * Drop a file on the element and start function onFilesAdded
             * @param e - element thet was dropped
             */
            fileDrop.ondrop = function(e){
                console.log('onDrop:', e);
                options.onFilesAdded(e.target.files);
            };

            fileDrop.error = function(e){
                console.log('Error Drop:', e);
            };

            fileDrop.init();

        }
	};
});
