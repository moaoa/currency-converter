require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const key = process.env.KEY

app.use(express.urlencoded({ extended: false }))

const url = 'https://fixer-fixer-currency-v1.p.rapidapi.com/'
app.get('/currency-options', (req, res) => {
    fetch(`${url}symbols`, {
        headers: {
            'x-rapidapi-host': 'fixer-fixer-currency-v1.p.rapidapi.com',
            'x-rapidapi-key': key
        },
        method: 'GET'
    })
        .then(res => res.json())
        .then(data => res.json(data))
})
app.get('/rates:base', (req, res) => {
    const base = req.params.base
    fetch(`${url}latest?base=${base}`, {
        headers: {
            'x-rapidapi-host': 'fixer-fixer-currency-v1.p.rapidapi.com',
            'x-rapidapi-key': key
        },
        method: 'GET'
    })
        .then(res => res.json())
        .then(data => res.json(data))
})

app.listen(port || 5000)
