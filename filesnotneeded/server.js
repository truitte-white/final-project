const express = require('express')
const cors = require('cors')
const logger = require('morgan')

const PORT = process.env.PORT || 3001

const app = express()

app.use(cors())
app.use(logger('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`)
})

app.get('/', (req, res) => {
    res.send("You're a wizard, Harry!")
  })

app.get('/message/:id', (request, response) => {
    console.log(`Getting a message with the id of ${request.params.id}`)
    response.send({ msg: `Message with an id of ${request.params.id} found` })
})