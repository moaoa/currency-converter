//@ts-check
require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const key = process.env.KEY

const axios = require('axios').default

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const url = 'https://fixer-fixer-currency-v1.p.rapidapi.com/'
app.get('/currency-options', (req, res) => {
    axios({
        url: `${url}symbols`,
        headers: {
            'x-rapidapi-host': 'fixer-fixer-currency-v1.p.rapidapi.com',
            'x-rapidapi-key': key
        }
    })
        .then(data => res.json(data.data.symbols))
        .catch(err => console.log(err))
})

app.get('/rates/:base', (req, res) => {
    let base = req.params.base

    axios
        .get(`${url}latest?base=${base}`, {
            headers: {
                'x-rapidapi-host': 'fixer-fixer-currency-v1.p.rapidapi.com',
                'x-rapidapi-key': key
            },

            responseType: 'json'
        })
        .then(data => res.json(data.data))
        .catch(err => console.log(err))
})

app.listen(port || 5000)
