const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const { registerValidator } = require('../lib/validator.js')

const db = require('../models')
const User = db.User

// 登入頁面
router.get('/login', (req, res) => {
  res.render('login')
})


// 登入檢查
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true,
    successFlash: '您已成功登入!',
    badRequestMessage: '請輸入email 及 密碼'
  })(req, res, next)

})
// 註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})
// 註冊檢查
router.post('/register', registerValidator, (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    let errorsMessages = []
    errors.array().forEach(error => {
      errorsMessages.push({ message: error.msg })
    })
    return res.render('register', { errors: errorsMessages })
  }

  else {
    const { name, email, password, password2 } = req.body
    User.findOne({ where: { email: email } }).then(user => {
      if (user) {
        console.log('this email already exists')
        res.render('register', { nama, email, password, password2 })
      }
      else {
        const newUser = new User({ name, email, password })

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash
            newUser
              .save()
              .then(user => res.redirect('/'))
              .catch(err => console.log(err))
          })
        })
      }
    })
  }
})
// 登出
router.get('/logout', (req, res) => {
  req.logout()

  req.flash('success', '您已經成功登出')
  res.redirect('/users/login')
})

module.exports = router