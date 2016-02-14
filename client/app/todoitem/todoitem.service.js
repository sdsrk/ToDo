'use strict';

angular.module('toDoApp')
  .service('todoService', function (Restangular) {

    // AngularJS will instantiate a singleton by calling "new" on this function
    var todo = Restangular.all("todoItemss");
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.get = function() {
    	return todo.get("");
    };
    this.add = function (req) {
    	return todo.post(req);
    };
    this.update = function (req) {
    	return todo.one('', req._id).customPUT(req);
    };
    this.delete = function (req) {
    	return todo.all(req).remove();
    };

  });
