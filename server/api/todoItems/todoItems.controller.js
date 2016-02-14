'use strict';

var _ = require('lodash');
var TodoItems = require('./todoItems.model');

// Get list of todoItemss
exports.index = function(req, res) {
  TodoItems.find(function (err, todoItemss) {
    if(err) { return handleError(res, err); }
    return res.json(200, todoItemss);
  });
};

// Get a single todoItems
exports.show = function(req, res) {
  TodoItems.findById(req.params.id, function (err, todoItems) {
    if(err) { return handleError(res, err); }
    if(!todoItems) { return res.send(404); }
    return res.json(todoItems);
  });
};

// Creates a new todoItems in the DB.
exports.create = function (req, res) {
  TodoItems.create(req.body, function(err, todoItems) {
    if(err) { return handleError(res, err); }
    return res.json(201, todoItems);
  });
};

// Updates an existing todoItems in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  TodoItems.findById(req.params.id, function (err, todoItems) {
    if (err) { return handleError(res, err); }
    if(!todoItems) { return res.send(404); }
    var updated = _.merge(todoItems, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, todoItems);
    });
  });
};

// Deletes a todoItems from the DB.
exports.destroy = function(req, res) {
  TodoItems.findById(req.params.id, function (err, todoItems) {
    if(err) { return handleError(res, err); }
    if(!todoItems) { return res.send(404); }
    todoItems.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

exports.gettodos = function(req, res) {
  var currTime = new Date();
  currTime.setSeconds(0,0);
  var pas = new Date(currTime);
  currTime.setMinutes(pas.getMinutes() + 15);
  pas.setMinutes(currTime.getMinutes() + 1);
  TodoItems.find({
      time: {
          $gte: currTime,
          $lte: pas
          //$lte : new Date()
      }
  })
  .exec(function (err, todo) {
      if(err) { return handleError(res, err); }
      return res.json(200, todo);
    })
};

exports.updateStatus = function(req, res) {
  console.log('inside update function')
TodoItems.findById(req.params.id)
.exec( function(err,todoItems){
  if(err){return handleError(res, err);}
 if(req.params.opt==0)
   todoItems.active = false
 if(req.params.opt==1 && req.params.ppcnt==todoItems.postponeCount)
    {
     var diff =  _.min([new Date(todoItems.time),new Date()])
     diff = diff.setDate(diff.getDate() + 1);
     todoItems.time = diff
     todoItems.postponeCount = todoItems.postponeCount +1
    }
   todoItems.save(function (err) {
     var comp = "updated successfully"
      if (err) { return handleError(res, err); }
      return res.json(200,comp);
    });
})
  
};


function handleError(res, err) {
  return res.send(500, err);
}

























