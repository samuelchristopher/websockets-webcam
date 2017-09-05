import express from 'express'
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)
const port = process.env.PORT || 8080
let connections = []

server.listen(port, () => console.log(`server running on port ${port}`))
app.set('view engine', 'pug')
app.use(express.static('styles'))
app.get('/', (req, res) => res.render('controller', {title: 'Controller'}))
app.get('/camera', (req, res) => res.render('camera', {title: 'Camera'}))


// sockets
io.sockets.on('connection', (socket) => {
  connections.push(socket)
  console.log('Connections number:', connections.length)

  // Disconnect
  socket.on('disconnect', (data) => {
    connections.splice(connections.indexOf(socket), 1)
    console.log('Disconnected, new number of sockets: ', connections.length)
  })

  // take a new snap
  socket.on('take a new snap', (data) => {
    io.sockets.emit('take a new snap')
    console.log('take a new snap please...')
  })

  socket.on('new image', (image) => {
    io.sockets.emit('new image', image)
    console.log('new image incoming...')
  })

  socket.on('image uploaded', (imageURL) => {
    io.sockets.emit('new snap', imageURL)
    console.log('new snap!')
  })
})
