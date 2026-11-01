var express = require('express')
var s = require('./service')
var r = express.Router()

r.get('/tasks', function (req, res) {
  res.send(s.getAll())
})

r.get('/tasks/:id', function (req, res) {
  var t = s.getTsk(req.params.id)
  if (t == null) {
    res.status(404).send({ error: 'not found' })
  } else {
    res.send(t)
  }
})

r.post('/tasks', function (req, res) {
  try {
    var result = s.add(req.body)
    if (result.err) {
      res.status(result.code).send({ error: result.err })
      return
    }
    res.status(201).send(result)
  } catch (e) {
    console.log(e)
  }
})

r.put('/tasks/:id', function (req, res) {
  try {
    var result = s.upd(req.params.id, req.body)
    if (result.err) {
      res.status(result.code).send({ error: result.err })
      return
    }
    res.send(result)
  } catch (e) {
    console.log(e)
  }
})

r.delete('/tasks/:id', function (req, res) {
  var ok = s.delete_task(req.params.id)
  if (ok == false) {
    res.status(404).send({ error: 'not found' })
  } else {
    res.status(204).send()
  }
})

module.exports = r
