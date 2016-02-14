'use strict';

angular.module('toDoApp')
  .controller('LoginCtrl', function ($scope, Auth, $location,$rootScope,$http,$window) {
    $scope.user = {};
    $scope.errors = {};

    $scope.authenticate = function(){
      $window.location.href = '/auth/google'
    }

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $rootScope.username = $scope.user.email
          $location.path('/');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

  });
