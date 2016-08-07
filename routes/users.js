var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
var db = require('../db/db')
router.use(bodyParser.json())

router.get('/', function (req, res) {
  db.getUsers()
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

module.exports = router
