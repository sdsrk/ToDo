'use strict';

describe('Controller: TodoitemCtrl', function () {

  // load the controller's module
  beforeEach(module('toDoApp'));

  var TodoitemCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TodoitemCtrl = $controller('TodoitemCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
