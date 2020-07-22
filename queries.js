const { Pool } = require('pg')
const pool = new Pool({
  user: 'postgres',
  password: 'password',
  host: 'database-1.cf1papb8yehx.us-east-2.rds.amazonaws.com',
  database: 'anime',
  port: 5432
})
const getCharacters = (request, response) => {
  pool.query('SELECT * FROM characters ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getCharactersById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM characters WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createCharacters = (request, response) => {
  const { first, last, show } = request.body

  pool.query('INSERT INTO characters (first, last, show) VALUES ($1, $2, $3)', [first, last, show], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.id}`)
  })
}

const updateCharacters = (request, response) => {
  const id = parseInt(request.params.id)
  const { first, last, show } = request.body

  pool.query(
    'UPDATE characters SET first = $1, last = $2, show = $3 WHERE id = $4',
    [first, last, show, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteCharacters = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM characters WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getCharacters,
  getCharactersById,
  createCharacters,
  updateCharacters,
  deleteCharacters,
}