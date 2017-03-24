const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

module.exports = {
  verifyUser(accessToken, refreshToken, profile, done) {
    done(null, profile)
  },
  init(CONFIG, application){
    passport.use(new GoogleStrategy({
      clientID: CONFIG.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: CONFIG.GOOGLE_OAUTH_SECRET_ID,
      callbackURL: `http://localhost:${CONFIG.APP_LISTEN_PORT}/auth/google/callback`
    }, this.verifyUser))

    passport.serializeUser(function (user, done) {
      done(null, user)
    })

    passport.deserializeUser(function (user, done) {
      done(null, user)
    })

    application.use(passport.initialize())
  }
}
