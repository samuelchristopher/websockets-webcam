import express from 'express'
const app = express()

app.set('view engine', 'pug')

app.get('/', (req, res) => res.render('controller', {message: 'Howdy friend'}))
app.get('/camera', (req, res) => res.render('camera', { message: 'Hi cam friend' }))

app.listen(8000, () => console.log('app is running on localhost:8000'))
