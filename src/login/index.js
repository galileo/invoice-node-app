const User = require('../user/index')()

module.exports = {
  verifyUser(accessToken, refreshToken, profile, done) {
    const xTeamEmails = profile.emails.filter(function (email) {
      return /@x-team.com$/.test(email.value)
    })

    const isOutsideDomain = 0 === xTeamEmails.length

    if (isOutsideDomain) {
      done(null, false, {message: 'Account outside the \'x-team.com\' domain.'})
      return
    }

    User.find({googleId: profile.id}).then(function (user) {
      console.log('success', user)

      done(null, user)
    }, function () {
      User.create(profile)
        .success(function () {
          done(null, user)
        })
        .reject(function () {
          done(null, false)
        })
    })

    done(null, profile)
  }
}
