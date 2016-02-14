'use strict';

angular.module('toDoApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    },
    {
      'title': 'To Do',
      'link': '/todoitem'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    console.log($scope.getCurrentUser(),'useeeeeeeeee')
    $scope.checkLoggedIn = function(){
      if(Object.keys($scope.getCurrentUser()).length != 0){
        console.log('true')
      }
      else
        console.log('false')
    }
    $scope.checkLoggedIn();
    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });