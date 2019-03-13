'use strict';

var localStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
    console.log('-------------------reaching here?---------------');
    // used to serialize the user for the session
    let userK = {
        username: 'kaleem',
        password: 'siddiqui1',
        last_update: Date.now
     }
    passport.serializeUser(function(user, done){
        done(null, user.username);
    });

    passport.deserializeUser(function(id, done) {
        done(null, userK);
    });

    passport.use('local-login', new localStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true 
    }, 
    function(req, username, password, done){

        if ((username === 'kaleem') && (password === 'siddiqui1')) {
           return done(null, userK);
        } else {
            return done(null, false, {message: 'username or password not correc'});
        }

 
    }));
};
