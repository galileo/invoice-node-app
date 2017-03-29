const CONFIG = require('./config.local')
const express = require('express')
const auth = require('./src/login/auth')

const app = express()
const Auth = auth(
  app,
  CONFIG.GOOGLE_OAUTH_CLIENT_ID,
  CONFIG.GOOGLE_OAUTH_SECRET_ID,
  `http://localhost:${CONFIG.APP_LISTEN_PORT}`
)

app.get('/', (req, res) => res.send('<a href="/auth/google">Sign In with Google</a>'))
app.get('/login', (req, res) => res.send('Unfortunetely you are not able to register with account outside our \'@x-team.com\' domain. Please try with your x-team account or <a href="/">go to main site</a>'))

app.get('/auth/google', Auth.redirectToLogin)
app.get('/auth/google/callback', Auth.handleResponse('/user/profile'))

app.get('/user/profile', function (req, res) {
  if (!req.user) {
    res.redirect('/')
  }

  const {displayName, emails} = req.user

  res.send(`
    <h1>UserProfile</h1>
    <p>You are successful logged in as <strong>${displayName}</strong></p>
    <form>
      <label for="email">Email:</label>
      <input id="email" name="email" value="${emails[0].value}"/>
    </form>
  `)
})


app.listen(CONFIG.APP_LISTEN_PORT, function () {
  console.log(`X-Team invoice server is running at port ${CONFIG.APP_LISTEN_PORT}!`)
})
