const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session')

const db = require('./models')
const Todo = db.Todo
const User = db.User

const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


app.use(session({
  secret: 'maggie',
  resave: 'false',
  saveUninitialized: 'false',
}))


app.use(passport.initialize())
app.use(passport.session())


require('./config/passport.js')(passport)


app.use((req, res, next) => {
  res.locals.user = req.user
  next()
})


// setting routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// 路由設定
app.use('/users', require('./routes/user.js'))


app.listen(port, (req, res) => {
  console.log(`App is running on port ${port}!`)
})