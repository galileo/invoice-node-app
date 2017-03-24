

module.exports = {
  verifyUser(accessToken, refreshToken, profile, done) {
    console.log('verify')
    console.log(profile)

    done(null, profile.id)
  }
}
