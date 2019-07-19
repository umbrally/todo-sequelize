const express = require('express')
const router = express.Router()
const passport = require('passport')

const db = require('../models')
const User = db.User

router.get('/login', (req, res) => {
  res.render('login')
})
// 登入檢查
router.post('/login', (req, res, next) => {
  res.send('登入檢查')
})
// 註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})
// 註冊檢查
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body
  User.findOne({ where: { email: email } }).then(user => {
    if (user) {
      console.log('this email already exists')
      res.render('register', { nama, email, password, password2 })
    }
    else {
      const newUser = new User({ name, email, password })
      newUser
        .save()
        .then(user => res.redirect('/'))
        .catch(err => console.log(err))
    }
  })
})
// 登出
router.get('/logout', (req, res) => {
  res.send('logout')
})
module.exports = router