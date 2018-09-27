const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const serveStatic = require('serve-static')
const path = require('path')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use('/', serveStatic(path.join(__dirname, '../client/dist')))

app.get('/posts', (req, res) => {
  res.send([{time: 60, payout: Math.floor(Math.random() * (5 - 1 + 1)) + 2}, {time: 120, payout: Math.floor(Math.random() * (8 - 1 + 1)) + 5}])
})

app.listen(process.env.PORT || 8081)
