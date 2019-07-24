const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const bcrypt = require('bcryptjs')
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

        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err
          if (isMatch) { return done(null, user) }
          else { return done(null, false, { message: 'Email 或 Password 輸入錯誤' }) }
        })
      })
    })
  )

  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ where: { email: profile._json.email } })
        .then(user => {
          if (!user) {
            let randomPassword = Math.random().toString(36).slice(-8)
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(randomPassword, salt, (err, hash) => {
                if (err) throw err
                const newUser = new User({
                  name: profile._json.name,
                  email: profile._json.email,
                  password: hash
                })
                newUser.save().then(user => {
                  return done(null, user)
                }).catch(err => console.log(err))
              })
            })
          }
          else {
            return done(null, user)
          }
        })
    }
  ))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findByPk(id).then(user => {
      done(null, user)
    })
  })
}
