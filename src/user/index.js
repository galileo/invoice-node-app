const create = function () {

}

const find = function (search) {
  const {googleId} = search

  const promise = new Promise(function (resolve, reject) {
    if (!googleId) {
      reject('No google id provided')
    }

    if (googleId === '102910006051885155614') {
      resolve({
        id: 102910006051885155614,
        username: 'kamil.ronewicz@x-team.com',
        email: 'kamil.ronewicz@x-team.com'
      })
    }
  })

  return promise
}

module.exports = function () {
  return {
    create: create,
    find: find
  }
}
