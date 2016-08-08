var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
var db = require('../db/db')
var request = require('superagent')

router.use(bodyParser.json())

router.get('/', function (req, res) {
  var keyword = req.query.search
  var dbquery = []
  if (req.query.search) {
    dbquery = db.getUsersByKeyword (keyword)
  } else {
    dbquery = db.getUsers()
  }
  dbquery
  .then(function (data) {
    res.json(data)
  })
  .catch(function (err) {
    res.status(500).send({"error": err})
  })
})

router.delete('/:id', function (req, res) {
  var id = req.params.id
  db.deleteUser(id)
    .then(function () {
      res.sendStatus(204)
    })
    .catch(function (err) {
      res.status(500).send({"error": err})
    })
})

router.put('/:id', function (req, res) {
  var id = req.params.id
  var name = req.body.name
  var email = req.body.email
  console.log(id, name, email)
  db.updateUser(id, name, email)
    .then(function (data) {
      res.json(data)
    })
    .catch(function (err) {
      res.status(500).send({"error": err})
    })
})

router.post('/', function (req, res) {
  var name = req.body.name
  var email = req.body.email
  console.log(name, email)
  db.createUser(name, email)
    .then(function (data) {
      console.log(data)
      res.status(201).json(data)
    })
    .catch(function (err) {
      res.status(500).send({"error": err})
    })
})

router.get('/surprise', function (req, res) {
  Promise.all([db.getUsers(),
  request
    .get('http://192.168.20.28:3000/users/99923')])
    .then(function (values) {
      var response = {
        data: values[0],
        surprise: values[1].text
      }
      res.send(response)
    })
    .catch(function (err) {
      res.send("ERROOOOOOORRRR")
    })
})

module.exports = router
