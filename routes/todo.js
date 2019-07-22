const express = require('express')
const router = express.Router()

const db = require('../models')
const User = db.User
const Todo = db.Todo

const { authenticated } = require('../config/auth.js')


// 列出所有todos
router.get('/', authenticated, (req, res) => {
  res.send('all todos')
})

// 新增一筆todo頁面
router.get('/new', authenticated, (req, res) => {
  res.send('新增')
})



// 新增一筆todo動作

router.post('/', authenticated, (req, res) => {
  res.send('新增動作')
})


// 顯示一筆todo 資訊
router.get('/:id', authenticated, (req, res) => {
  res.send('顯示一筆')
})




// 修改一筆todo頁面

router.get('/:id/edit', authenticated, (req, res) => {
  res.send('修改')
})

// 修改一筆todo動作
router.put('/:id', authenticated, (req, res) => {
  res.send('修改動作')
})


// 刪除一筆todo
router.delete('/:id', authenticated, (req, res) => {
  res.send('刪除')
})



module.exports = router
