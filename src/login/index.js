module.exports = {
  verifyUser(accessToken, refreshToken, profile, done) {
    done(null, profile)
  }
}
