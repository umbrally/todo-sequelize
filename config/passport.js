const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const db = require('../models')
const User = db.User

module.exports = passport => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ where: { email: email } }).then(user => {
        if (!user) {
          console.log('That email is not registered.')
          return done(null, false, { message: '此 email 尚未註冊' })
        }
        if (password != user.password) {
          console.log('user password not correct.')
          return done(null, false, { message: 'Email 或 Password 輸入錯誤' })
        }
        else {
          return done(null, user)
        }
      })
    })
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findByPk(id).then(user => {
      done(null, user)
    })
  })
}
