// import express from 'express'
// import ws from 'ws'
// import http from 'http'
// const app = express()
// const appPort = process.env.PORT || 8000
// const wsPort = appPort + 1
// app.set('view engine', 'pug')
//
// app.get('/', (req, res) => res.render('controller', {message: 'Howdy friend'}))
// app.get('/camera', (req, res) => res.render('camera', { message: 'Hi cam friend' }))
//
// const server = http.createServer(app)
// server.listen(appPort, () => console.log(`app is running on localhost:${appPort}`))
// const wss = new ws.Server({ server: server}, () => console.log('websockets server created'))
//
// wss.broadcast = (data) => {
//   for(var i in this.clients)
//     this.clients[i].send(data)
// }
//
// wss.on('connection', (ws) => {
//   console.log('websocket connection open')
//   let obj = {
//     evt: 'connection',
//     message: 'connection made!! wooooyeah'
//   }
//   ws.send(JSON.stringify(obj))
//   ws.on('close', () => console.log('websocket connection closed'))
//   ws.on('message', (message) => wss.broadcast(message))
// })
import express from 'express'
import firebase from 'firebase'
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)
const port = process.env.PORT || 8080
let connections = []

server.listen(port, () => console.log(`server running on port ${port}`))
app.set('view engine', 'pug')
app.get('/', (req, res) => res.render('controller', {message: 'Howdy friend', firebase}))
app.get('/camera', (req, res) => res.render('camera', { message: 'Hi cam friend', firebase}))

// firebase

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBh76oXCLJpUTUhPKIi-KE6GW7KnXIBEWc",
  authDomain: "websockets-webcam.firebaseapp.com",
  databaseURL: "https://websockets-webcam.firebaseio.com",
  projectId: "websockets-webcam",
  storageBucket: "websockets-webcam.appspot.com",
  messagingSenderId: "271757743205"
};
firebase.initializeApp(config);

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

  socket.on('image uploaded', (imageURL) => {
    io.sockets.emit('new snap', imageURL)
    console.log('new snap!')
  })
})
