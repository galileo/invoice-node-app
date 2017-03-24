module.exports = {
  verifyUser(accessToken, refreshToken, profile, done) {
    console.log('veryfying')
    User.findOrCreate({googleId: profile.id}, function (err, user) {
      return done(err, user)
    })
  }
}
