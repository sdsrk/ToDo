var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var GoogleTokenStrategy = require('passport-google-token').Strategy;

exports.setup = function (User, config) {
  function fetchUser(accessToken, refreshToken, profile, done) {
    User.findOne({
          'email': profile.emails[0].value.toLowerCase()
        }, function(err, user) {
          if (!user) {
            user = new User({
              name: profile.displayName,
              email: profile.emails[0].value.toLowerCase(),
              provider: 'google',
              google: profile._json
            });
            user.save(function(err) {
              if (err) done(err);            
             
              return done(err, user);
            });
          } else {
            user.google = profile._json;
            console.log(user,'userrrrrrrrrrrrrrrrr');
            
            User.update({'email': profile.emails[0].value.toLowerCase()},
            { $set: {
              name: profile.displayName,
              provider: 'google',
              google: profile._json
            }},{upsert: true},  function (err) {
            });
            return done(err, user);
          }
    });
  }

  passport.use(new GoogleStrategy({
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret,
      callbackURL: config.google.callbackURL
    }, fetchUser));
  passport.use(new GoogleTokenStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret
  }, fetchUser));
};
