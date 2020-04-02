import React from 'react'
import './App.css'
import ConvertRow from './ConvertRow'
import { useState, useEffect } from 'react'

function App() {
    const [fromCurrency, setFromCurrency] = useState('USD')
    const [toCurrency, setToCurrency] = useState('EUR')
    const [currencyOptions, setCurrencyOptions] = useState([])
    const [rates, setRates] = useState()

    useEffect(() => {
        fetch('/currency-options')
            .then(res => res.json())
            .then(data => console.log(data))
    }, [])

    useEffect(() => {
        fetch(`rates/${fromCurrency}`)
            .then(res => res.json())
            .then(data => setRates(data.rates))
    }, [fromCurrency])

    return (
        <div>
            {/* <ConvertRow
                currencyOptions={currencyOptions}
                selectedCurrency={fromCurrency}
            /> */}
            <div className="equal">=</div>
            {/* <ConvertRow
                currencyOptions={currencyOptions}
                selectedCurrency={toCurrency}
            /> */}
        </div>
    )
}

export default App
