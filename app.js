const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const cors = require('cors')
const path = require('path')
const routes = require('./routes/routes')

const app = express()
mongoose.connect('mongodb://MongoRoot:password988@ds119070.mlab.com:19070/shoppinglist-3414').then(
  () => {
    console.log('MongoDB connected')
  }, (err) => {
    console.log(`Error connected to MongoDB: ${err}`)
  }
)

app.use(cors())
app.use(bodyparser.json())
app.use('/api', routes)

app.use(express.static(path.join(__dirname, './public')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
})

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})