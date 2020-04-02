import React from 'react'
import './ConvertRow.css'
export default function ConvertRow(props) {
    const { selectedCurrency, currencyOptions } = props
    return (
        <div>
            <select value={selectedCurrency}>
                {currencyOptions.map((currency, i) => (
                    <option key={i} value={currency}>
                        {currency}
                    </option>
                ))}
            </select>
        </div>
    )
}
