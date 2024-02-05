const express = require('express')
const app = express()
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const fetch = require('node-fetch')
const mongoose = require('mongoose')
app.use(express.json())

//connecting mongodb database

mongoose.connect(
  'mongodb://localhost:27017/transactions',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  error => {
    if (!error) {
      console.log('connected to db')
    } else {
      console.error('mongoDb connection error', error)
    }
  },
)

//SCHEMA

const schema = {
  id: Number,
  title: String,
  description: String,
  price: Number,
  category: String,
  sold: String,
  image: String,
  dateOfSale: String,
}

const mongooseModel = mongoose.model('TransactionsSchema', schema)

app.post('/post', async (request, response) => {
  const data = new mongooseModel({
    id: request.body.id,
    title: request.body.title,
    description: request.body.description,
    price: request.body.price,
    category: request.body.category,
    sold: request.body.sold,
    image: request.body.image,
    dateOfSale: request.body.dateOfSale,
  })

  const values = await data.save()
  response.json(values)
})

const dbPath = 'transactions.db'
let db = null

const initializeDbServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })

    await db.run(
      `CREATE TABLE IF NOT EXISTS transaction (
        id INTEGER PRIMARY KEY,
        title TEXT,
        description VARCHAR(300),
        price REAL,
        category TEXT,
        sold INTEGER,
        image TEXT,
        dateOfSale TEXT
      )`,
    )

    await initializeDatabase()

    app.listen(3000, () => {
      console.log('Server is running at http://localhost:3000')
    })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
    process.exit(1)
  }
}

const initializeDatabase = async () => {
  try {
    const url = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json'
    const fetchData = await fetch(url)
    const jsonData = await fetchData.json()

    for (const data of jsonData) {
      await db.run(
        `INSERT INTO transaction(title, description, price, category, sold, image, dateOfSale)
          VALUES (?, ?, ?, ?, ?, ?, ?);`,
        [
          data.id,
          data.title,
          data.description,
          data.price,
          data.category,
          data.sold,
          data.image,
          data.dateOfSale,
        ],
      )
    }
    console.log('Database initialized with seed data.')
  } catch (error) {
    console.error('Error initializing database:', error)
  }
}

initializeDbServer()

app.get('/list-transactions', async (req, res) => {
  try {
    const {page = 1, perPage = 10, search = ''} = req.query
    const offset = (page - 1) * perPage

    let query = 'SELECT * FROM transaction'
    const params = []

    if (search) {
      query += ' WHERE title LIKE ? OR description LIKE ? OR price LIKE ?'
      params.push(`%${search}%`, `%${search}%`, `%${search}%`)
    }

    query += ' ORDER BY dateOfSale DESC LIMIT ? OFFSET ?'
    params.push(parseInt(perPage), parseInt(offset))

    const transactions = await db.all(query, params)

    res.status(200).json({transactions})
  } catch (error) {
    console.error('Error listing transactions:', error)
    res.status(500).json({error: 'Internal Server Error'})
  }
})

// Statistics API for the selected month
app.get('/statistics', async (req, res) => {
  try {
    const {month} = req.query

    if (!month) {
      return res.status(400).json({error: 'Month parameter is required'})
    }

    const totalSaleAmountResult = await db.get(
      "SELECT SUM(price) AS totalSaleAmount FROM transaction WHERE strftime('%m', DATE(dateOfSale)) = ?",
      [month],
    )

    const totalSoldItemsResult = await db.get(
      "SELECT COUNT(*) AS totalSoldItems FROM transaction WHERE sold = 1 AND strftime('%m', dateOfSale) = ?",
      [month],
    )

    const totalNotSoldItemsResult = await db.get(
      "SELECT COUNT(*) AS totalNotSoldItems FROM transaction WHERE sold = 0 AND strftime('%m', dateOfSale) = ?",
      [month],
    )

    const statistics = {
      totalSaleAmount: totalSaleAmountResult.totalSaleAmount || 0,
      totalSoldItems: totalSoldItemsResult.totalSoldItems || 0,
      totalNotSoldItems: totalNotSoldItemsResult.totalNotSoldItems || 0,
    }

    res.status(200).json({statistics})
  } catch (error) {
    console.error('Error fetching statistics:', error)
    res.status(500).json({error: 'Internal Server Error'})
  }
})
