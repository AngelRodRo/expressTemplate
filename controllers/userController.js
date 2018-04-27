var bcrypt = require('bcrypt')
var mongoose = require('mongoose')

var User = require('../models/User')

module.exports.create = (req, res) => {
  let data = req.body
  let user = new User()
  user.name = data.name
  user.email = data.email
  user.lastname = data.lastname
  user.password = bcrypt.hashSync(data.password, 10)
  user.save((err, user) => {
      if (err) return res.sendStatus(503)
      return res.json(user)
  });
}

module.exports.getOne = (req, res) => {
  let id = req.params.id
  User.findOne({_id: id}).exec((err, user) => {
    if (err) return res.sendStatus(503)
    if (!user) return res.sendStatus(404)
    return res.json(user)
  })
}

module.exports.read = (req, res) => {
  User.find({}).exec((err, users) => {
    if (err) return res.sendStatus(503)
    if (!users) return res.sendStatus(404)
    return res.json(users)
  })
}

module.exports.readBy = (req, res) => {
  let filters = req.body
  User.find(filters).exec((err, users) => {
    if (err) return res.sendStatus(503)
    if (!users) return res.sendStatus(404)
    return res.json(users)
  })
}

module.exports.user = (req, res) => {
  if (req.user) {
    let id = req.user
    User.findOne({_id:id}).exec((err, user) => {
      if (err) return console.log(503)
      if (!user) return res.sendStatus(404)
      return res.json(user)
    })
  }
}

module.exports.update = (req, res) => {
  let data = req.body
  let id = data._id
  delete data._id
  User.findOneAndUpdate({_id: id}, data, {new: true}, (err, user) => {
    if (err) return res.sendStatus(503)
    if (!user) return res.sendStatus(404)
    User.findOne({_id: user._id}).exec((err, user) => {
      if (err) return res.sendStatus(503)
      if (!user) return res.sendStatus(404)
      return res.json(user)
    })
  })
}

module.exports.delete = (req, res) => {
  let id = req.params.id

  User.findOneAndRemove({_id: id}, (err) => {
    if (err) return res.sendStatus(503)
    return res.json(200)
  })
}

module.exports.login = (req,res) => {
  let data = req.body
  User.findOne({email:data.email}).then((user, err) => {
    if (err) return res.sendStatus(503)
    if (!user) return res.sendStatus(404)
    res.json(user)
  })
}
