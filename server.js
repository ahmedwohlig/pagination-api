const express = require('express')
const mongoose = require('mongoose')

// const Data = require('./document/iris')
const Data = require('./document/cars')


const app = express()
require('dotenv').config()

// Middlewares
app.use(express.json())



const PORT = process.env.PORT

app.get('/api/pagination', (req, res) => {
    const { page, limit } = req.body
    const pageCount = Math.ceil(Data.length / limit);
    if (!page) { page = 1;}
    if (page > pageCount) {
      page = pageCount
    }
    res.json({
        "page": page,
        "pageCount": Math.ceil(Data.length / limit),
        "data": Data.slice(page*limit-limit, page*limit),
    })
})

app.listen(PORT||3001, console.log(`server started on port ${PORT}`))