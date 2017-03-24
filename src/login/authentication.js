const login = require('./index')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const passport = require('passport')

class Authentication {
  constructor (clientId = requiredParam('clientId'),
               secretId = requiredParam('secretId'),
               hostname = requiredParam('hostname')) {
    this.secretId = clientId
    this.clientId = secretId
    this.hostname = hostname
    this.passport = passport
  }

  configureWebserver (webserver) {
    this.initialize()

    webserver.use(this.passport.initialize())
  }

  initialize () {
    this.passport.use(new GoogleStrategy({
      clientID: this.clientId,
      clientSecret: this.clientId,
      callbackURL: `${this.hostname}/auth/google/callback`
    }, login.verifyUser))

    this.passport.serializeUser(function (user, done) {
      done(null, user)
    })

    this.passport.deserializeUser(function (user, done) {
      done(null, user)
    })
  }

  authenticate () {
    console.log('Starting to authenticate')
    return this.passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/plus.login']})
  }

  callback () {
    console.log('Authentication completed')
    return this.passport.authenticate('google', {failureRedirect: '/login'})
  }
}

const requiredParam = function (paramName) {
  throw new Error(`Your are missing required parameter please insert "${paramName}"`)
}

module.exports = Authentication
