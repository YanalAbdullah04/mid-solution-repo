// data
var DATA = []
var counter = 0

module.exports.DATA = DATA
module.exports.getCounter = function () { counter = counter + 1; return counter }
