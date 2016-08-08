var bodyParser = require('body-parser')
var express = require('express')
var hbs = require('express-handlebars')
var path = require('path')
var users = require('./routes/users')
var cors = require('cors')

var index = require('./routes/index')

var PORT = 3000

var app = express()
app.engine('hbs', hbs())
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(cors())

app.get('/', index.get)
app.use('/users', users)

app.listen(PORT, function () {
  console.log('Listening on port', PORT)
})
