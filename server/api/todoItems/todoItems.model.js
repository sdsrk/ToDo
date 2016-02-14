'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TodoItemsSchema = new Schema({
	todo:String,
  location: String,
  time: Date,
  active: Boolean,
  userEmail: String,
  postponeCount: {type:Number,default: 0}
});

module.exports = mongoose.model('TodoItems', TodoItemsSchema);