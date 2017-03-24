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

passport.serializeUser(function (user, done) {
  console.log('serialize user', user)

  done(null, user)
})

passport.deserializeUser(function (user, done) {
  console.log('deserializing user', user)

  done(null, user)
})

app.use(passport.initialize())

app.get('/', (req, res) => {
  console.log(req)
  console.log(res)
  res.send('<a href="/auth/google">Sign In with Google</a>')
})

app.get('/auth/google', passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/plus.login']}))
app.get('/auth/google/callback',
  passport.authenticate('google', {failureRedirect: '/login'}),
  function (req, res) {
    res.redirect('/')
  })

app.listen(CONFIG.APP_LISTEN_PORT, function () {
  console.log(`X-Team invoice server is running at port ${CONFIG.APP_LISTEN_PORT}!`)
})
