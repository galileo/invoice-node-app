const CONFIG = require('./config.local')
const express = require('express')
const passport = require('passport')
const login = require('./src/login/index')

const app = express()

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

passport.use(new GoogleStrategy({
  clientID: CONFIG.GOOGLE_OAUTH_CLIENT_ID,
  clientSecret: CONFIG.GOOGLE_OAUTH_SECRET_ID,
  callbackURL: `http://localhost:${CONFIG.APP_LISTEN_PORT}/auth/google/callback`
}, login.verifyUser))

passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/plus.login']})

app.listen(CONFIG.APP_LISTEN_PORT, function () {
  console.log(`X-Team invoice server is running at port ${CONFIG.APP_LISTEN_PORT}!`)
})
