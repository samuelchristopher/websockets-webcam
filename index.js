import express from 'express'
const app = express()
app.get('/', (req, res) => res.send('Hello Web Cam bro!'))
app.listen(8000, () => console.log('app is running on localhost:8000'))
