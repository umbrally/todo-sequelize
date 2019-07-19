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

app.listen(port, (req, res) => {
  console.log(`App is running on port ${port}!`)
})