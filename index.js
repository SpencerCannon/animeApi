const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./queries')
const port = 3000
const app = express()

app.use(cors()) 
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/characters', db.getCharacters)
app.get('/characters/:id', db.getCharactersById)
app.post('/characters', db.createCharacters)
app.put('/characters/:id', db.updateCharacters)
app.delete('/characters/:id', db.deleteCharacters)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

app.listen(port, () => {
console.log(`App running on port ${port}.`)
})