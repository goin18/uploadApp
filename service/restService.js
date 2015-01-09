angular.module('restApp').factory('restService',function($http, ADDRESS) {

    var restService = {
        data: {
            users:[]
        },
        getAll: function () {
            var self = this;
            var promise = $http({url: ADDRESS.root+'/test', method: 'GET'}).
                success(function (data) {
                    console.log('Get All: ', data);
                    self.data.users = data;
                }).
                error(function (data, status, headers, config) {
                    console.log(data);
                });
            return promise;
        },
        getById: function(id){
            var data = {
                id:id
            };

            var promise = $http({url: ADDRESS.root+'/test', method: 'GET', data:data}).
                success(function (data) {
                    console.log('Get One: ', data);
                    return data;
                }).
                error(function (data, status, headers, config) {
                    console.log(data);
                });
            return promise;
        },

        postUser:function(data,cb) {
            var promise = $http({url: ADDRESS.root+'/test', method: 'POST', data:data}).
                success(function (data) {
                    console.log('Get One: ', data);
                    cb(data);
                }).
                error(function (data, status, headers, config) {
                    console.log(data);
                });
            return promise;
        },

        deleteUser:function(id, cb){
            var self = this;

            var promise = $http({method: 'DELETE', url:ADDRESS.root + '/test/'+id }).
                success(function(data){
                    console.log('Delete:', data);
                    cb();
                }).
                error(function(data){
                   console.log('Error delete user: ',data);
                });
            return promise;
        },

        putUser:function(data, cb){
            var self = this;

            var promise = $http({method:'PUT', url:ADDRESS.root + '/test', data:data}).
                success(function(data){
                   console.log('Put:', data);
                    cb(data);
                }).
                error(function(data){
                    console.log('Error put user:', data);
                });
        }
    };


    return restService;
});
