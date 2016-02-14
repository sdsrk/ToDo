 /**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var request = require('request');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/todoItemss', require('./api/todoItems'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));

  var cron = require('cron');

  var nodemailer = require('nodemailer');
  var smtpTransport = require('nodemailer-smtp-transport');

  var transporter = nodemailer.createTransport(
    smtpTransport('smtps://todoapp51%40gmail.com:9935106755@smtp.gmail.com')
);
  
 
var cronJob = cron.job('*/1 * * * *', function(){

  var url;

    request({
      uri: "http://localhost:9000/api/todoItemss/notify", 
      method: "GET",
      timeout: 10000,
      followRedirect: true,
      maxRedirects: 10
    }, function(error, response, body) {
      var x = JSON.parse(body);
      for(var i=0;i<x.length;i++){
        var url1 = 'http://localhost:9000/api/todoItemss/update/'+x[i]._id+'/0/'+x[i].postponeCount
        var url2 = 'http://localhost:9000/api/todoItemss/update/'+x[i]._id+'/1/'+x[i].postponeCount
        var receiver = x[i].userEmail
        var mailOptions = {
          from: 'todoapp51@gmail.com', // sender address
          to: receiver, // list of receivers
          subject: x[i].todo+' event in next 15 mins', // Subject line 
          html: "<label>Click on link to close event: "+url1+"</label><br/><label>Click on line to postpone event :"+url2+"</label>" // html body 
      };
        transporter.sendMail(mailOptions, function(error, response) {
           if (error) {
                console.log(error);
           } else {
                console.log('Message sent');
           }
        });
      }
    });

   
    console.info('cron job completed in routes');
}); 
 //cronJob.start(); 
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
