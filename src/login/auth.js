const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const login = require('./index')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

module.exports = function (app, clientId, clientSecret, hostname) {

  passport.use(new GoogleStrategy({
    clientID: clientId,
    clientSecret: clientSecret,
    callbackURL: `${hostname}/auth/google/callback`
  }, login.verifyUser))

  passport.serializeUser(function (user, done) {
    console.log('serialize', user);
    done(null, user)
  })

  passport.deserializeUser(function (user, done) {
    console.log('unserialize', user);
    done(null, user)
  })

  app.use(express.static('public'))
  app.use(cookieParser())
  app.use(bodyParser.json())
  app.use(session({secret: 'invoice_app', resave: true, saveUninitialized: true}))
  app.use(passport.initialize())
  app.use(passport.session())

  return {
    redirectToLogin: passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    }),
    handleResponse: function (successPath, failurePath = '/login') {
      return passport.authenticate('google', {successRedirect: successPath, failureRedirect: failurePath})
    }
  }
}
