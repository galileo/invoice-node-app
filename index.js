const CONFIG = require('./config.local')

const passport = require('passport')
const login = require('./src/login/index')

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

passport.use(new GoogleStrategy({
  clientID: CONFIG.GOOGLE_OAUTH_CLIENT_ID,
  clientSecret: CONFIG.GOOGLE_OAUTH_SECRET_ID
}, login.verifyUser))

// console.log(passport)
