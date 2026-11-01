var data = require('./data')

function getAll() {
  console.log('getting all tasks')
  return data.DATA
}

function getTsk(id) {
  for (var i = 0; i < data.DATA.length; i++) {
    if (data.DATA[i].id == id) {
      return data.DATA[i]
    }
  }
  return null
}

function add(t) {
  if (t.title == undefined || t.title == null || t.title == '' || typeof t.title != 'string' || t.title.trim() == '') {
    return { err: 'title is required', code: 400 }
  }
  var x = { id: data.getCounter(), title: t.title, description: t.description, done: t.done == true }
  data.DATA.push(x)
  console.log('added ' + JSON.stringify(x))
  return x
}

function upd(id, t) {
  var found = null
  for (var i = 0; i < data.DATA.length; i++) {
    if (data.DATA[i].id == id) {
      found = data.DATA[i]
    }
  }
  if (found == null) return { err: 'not found', code: 404 }
  if (t.title != undefined) {
    if (t.title == null || t.title == '' || typeof t.title != 'string' || t.title.trim() == '') {
      return { err: 'title is required', code: 400 }
    }
    found.title = t.title
  }
  if (t.description != undefined) found.description = t.description
  if (t.done != undefined) found.done = t.done == true
  return found
}

function delete_task(id) {
  var idx = -1
  for (var i = 0; i < data.DATA.length; i++) {
    if (data.DATA[i].id == id) {
      idx = i
    }
  }
  if (idx == -1) return false
  data.DATA.splice(idx, 1)
  return true
}

module.exports = { getAll, getTsk, add, upd, delete_task }
