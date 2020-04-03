import React from 'react'
import './ConvertRow.css'
export default function ConvertRow(props) {
    const {
        selectedCurrency,
        currencyOptions,
        onInput,
        onCurrencyChange,
        amount
    } = props
    return (
        <div>
            <input value={amount} onChange={onInput}></input>
            <select value={selectedCurrency} onChange={onCurrencyChange}>
                {currencyOptions.map((currency, i) => (
                    <option key={i} value={currency}>
                        {currency}
                    </option>
                ))}
            </select>
        </div>
    )
}
