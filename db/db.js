var development = require('../knexfile').development
var knex = require('knex')(development)

module.exports = {
  getUsers: getUsers,
  deleteUser: deleteUser,
  updateUser: updateUser,
  createUser: createUser,
  getUsersByKeyword: getUsersByKeyword
}

function getUsers () {
  return knex('users')
    .select()
}

function deleteUser (id) {
  return knex('users')
   .where('id', id)
   .del()
}

function updateUser(id, name, email) {
  return knex('users')
    .where('id', id)
    .update({
      name: name,
      email: email
    })
    .then(function () {
      return knex('users')
        .select('*')
        .where('id', id)
    })
}

function createUser(name, email) {
  return knex('users')
  .insert({
    name: name,
    email: email
  })
  .then(function () {
    return knex('users')
    .select('*')
    .where('email', email)
  })
}

function getUsersByKeyword (keyword) {
  return knex('users')
    .select()
    .where('name', 'like', '%' + keyword + '%')
}
