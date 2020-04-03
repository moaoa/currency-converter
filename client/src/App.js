import React from 'react'
import './App.css'
import ConvertRow from './ConvertRow'
import { useState, useEffect } from 'react'

function App() {
    const [fromCurrency, setFromCurrency] = useState('USD')
    const [toCurrency, setToCurrency] = useState('EUR')
    const [currencyOptions, setCurrencyOptions] = useState([])
    const [rates, setRates] = useState({})
    const [amount, setAmount] = useState(1)
    const [fromInput, setFromInput] = useState(true)

    let fromAmount, toAmount

    if (fromInput) {
        fromAmount = amount
        toAmount = rates[toCurrency] ? amount * rates[toCurrency] : 'error'
    } else {
        toAmount = amount
        fromAmount = rates[toCurrency] ? amount / rates[toCurrency] : 'error'
    }

    useEffect(() => {
        fetch('/currency-options', {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                setCurrencyOptions(Object.keys(data))
            })
    }, [])

    useEffect(() => {
        fetch(`/rates/${fromCurrency}`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => setRates(data.rates))
    }, [fromCurrency])

    return (
        <div>
            <ConvertRow
                currencyOptions={currencyOptions}
                selectedCurrency={fromCurrency}
                amount={fromAmount}
                onInput={e => {
                    setFromInput(true)
                    setAmount(e.target.value)
                }}
                onCurrencyChange={e => setFromCurrency(e.target.value)}
            />
            <div className="equal">=</div>
            <ConvertRow
                currencyOptions={currencyOptions}
                selectedCurrency={toCurrency}
                amount={toAmount}
                onInput={e => {
                    setFromInput(false)
                    setAmount(e.target.value)
                }}
                onCurrencyChange={e => setToCurrency(e.target.value)}
            />
        </div>
    )
}

export default App
