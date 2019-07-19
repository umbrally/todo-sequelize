const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// setting routes
app.get('/', (req, res) => {
  res.send('Hello World!')

})

// 認證系統的路由
// login 頁面
app.get('/users/login', (req, res) => {
  res.render('login')
})


// login 檢查
app.post('/users/login', (req, res) => {
  res.render('login')
})
// 註冊頁面
app.get('/users/register', (req, res) => {
  res.render('register')
})
// 註冊檢查
app.post('/users/register', (req, res) => {
  res.send('register')
})
// 登出
app.get('/users/logout', (req, res) => {
  res.send('logout')
})


app.listen(port, (req, res) => {
  console.log(`App is running on port ${port}!`)
})