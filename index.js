const CONFIG = require('./config.local')
const express = require('express')
const passport = require('passport')

const Authentication = require('./src/login/authentication')

const auth = new Authentication(
  CONFIG.GOOGLE_OAUTH_CLIENT_ID,
  CONFIG.GOOGLE_OAUTH_SECRET_ID,
  `http://localhost:${CONFIG.APP_LISTEN_PORT}`
)

const app = express()

auth.configureWebserver(app)

app.get('/', (req, res) => res.send('<a href="/auth/google">Sign In with Google</a>'))

app.get('/auth/google', auth.authenticate())

app.get('/auth/google/callback', auth.callback(),
  function (req, res) {
    let {id, displayName} = req.user
    res.send(`Hello you are logged in as  ${displayName} with id ${id}`)
  })

app.listen(CONFIG.APP_LISTEN_PORT, function () {
  console.log(`X-Team invoice server is running at port ${CONFIG.APP_LISTEN_PORT}!`)
})
