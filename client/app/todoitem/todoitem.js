'use strict';

angular.module('toDoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('todoitem', {
        url: '/todoitem',
        templateUrl: 'app/todoitem/todoitem.html',
        controller: 'TodoitemCtrl'
      });
  });