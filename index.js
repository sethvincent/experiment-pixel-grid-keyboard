var grid = require('pixel-grid')
var vkey = require('vkey')

var data = []
var size = 16
var rows = 30
var columns = 30
var position = 280
var coordinates = setCoordinates(position)

for (var i = 0; i < rows; i++) {
  for (var j = 0; j < columns; j++) {
    data.push([0, 0, 0])
  }
}

var pixels = grid(data, {
  root: document.body,
  rows: rows,
  columns: columns,
  size: size,
  padding: 1,
  background: [0, 0, 0],
  formatted: true
})

function setCoordinates (pos) {
  return [
    pos - Math.floor(pos / columns) * columns,
    Math.floor(pos / rows)
  ]
}

function drawRect () {
  for (var i = -1; i < 2; i++) {
    for (var j = -1; j < 2; j++) {
      data[Math.min((coordinates[1] + i) * columns + (coordinates[0] + j), data.length)] = [1, 1, 1]
    }
  }
}

function moveRect (newPos) {
  if (newPos <= rows * columns) {
    position = newPos
  }
}

function left () {
  var pos = position - 1
  var coords = setCoordinates(pos)
  if (coords[0] > 0) position = pos
}

function right () {
  var pos = position + 1
  var coords = setCoordinates(pos)
  if (coords[0] < columns - 1) position = pos
}

function up () {
  var pos = position - columns
  var coords = setCoordinates(pos)
  if (coords[1] >= 1) position = pos
}

function down () {
  var pos = position + columns
  var coords = setCoordinates(pos)
  if (coords[1] + 1 < rows) position = pos
}

function checkKeys (row, column) {
  if (keys.D) right()
  else if (keys.A) left()
  else if (keys.W) up()
  else if (keys.S) down()
}

pixels.frame(function () {
  coordinates = setCoordinates(position)
  checkKeys()
  drawRect()
  for (var i = 0; i < data.length; i++) {
    rand = Math.random() * 0.02
    data[i] = [
      data[i][0] * 0.95 + rand,
      data[i][1] * 0.95 + rand,
      data[i][2] * 0.95 + rand
    ]
  }
  pixels.update(data)
})

var keys = {}
document.addEventListener('keydown', function (e) {
  keys[vkey[e.keyCode]] = true
  if (e.keyCode === 40 || e.keyCode === 38 || e.keyCode === 37 || e.keyCode === 39 || e.keyCode === 32) {
    e.preventDefault()
  }
}, false)

document.addEventListener('keyup', function (e) {
  delete keys[vkey[e.keyCode]]
}, false)
