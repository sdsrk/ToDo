'use strict';

describe('Service: todoitem', function () {

  // load the service's module
  beforeEach(module('toDoApp'));

  // instantiate service
  var todoitem;
  beforeEach(inject(function (_todoitem_) {
    todoitem = _todoitem_;
  }));

  it('should do something', function () {
    expect(!!todoitem).toBe(true);
  });

});
