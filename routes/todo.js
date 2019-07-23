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
  return res.render('new')
})


// 新增一筆todo動作

router.post('/', authenticated, (req, res) => {
  const newTodo = new Todo({
    name: req.body.name,
    done: false,
    UserId: req.user.id
  })
  newTodo
    .save()
    .then(todo => res.redirect('/'))
    .catch(err => res.status(422).json(err))

})


// 顯示一筆todo 資訊
router.get('/:id', authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then(user => {
      if (!user) throw new Error('user not found')
      return Todo.findOne({
        where: {
          UserId: req.user.id,
          Id: req.params.id
        }
      })
    })
    .then(todo => res.render('detail', { todo }))
    .catch(err => res.status(422).json(err))
})




// 修改一筆todo頁面

router.get('/:id/edit', authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then(user => {
      if (!user) throw new Error('user not found')
      return Todo.findOne({
        where: {
          UserId: req.user.id,
          Id: req.params.id
        }
      })
    })
    .then(todo => res.render('edit', { todo }))
    .catch(err => res.status(422).json(err))
})

// 修改一筆todo動作
router.put('/:id', authenticated, (req, res) => {
  Todo.findOne({
    where: {
      UserId: req.user.id,
      Id: req.params.id
    }
  })
    .then(todo => {
      todo.name = req.body.name
      console.log('what is req.body.done', req.body.done)
      todo.done = req.body.done === 'on'
      return todo.save()
    })
    .then((todo) => { return res.redirect(`/todos/${req.params.id}`) })
    .catch(err => res.status(422).json(err))
})


// 刪除一筆todo
router.delete('/:id', authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then(user => {
      if (!user) throw new Error("user not found")
      return Todo.destroy({
        where: {
          UserId: req.user.id,
          Id: req.params.id
        }
      })
    })
    .then(todo => {
      console.log('what is todo', todo)
      res.redirect('/')
    })
    .catch(err => res.status(422).json(err))
})





module.exports = router
