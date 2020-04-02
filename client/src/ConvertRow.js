import React from "react";
import "./ConvertRow.css";
export default function ConvertRow(props) {
  const { selectedCurrency, currencyOptions, onChangeCurrency, amount } = props;
  return (
    <div>
      <input onChange={props.handleInput} value={amount} />
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOptions.map((currency, i) => {
          return (
            <option key={i} value={currency}>
              {currency}
            </option>
          );
        })}
      </select>
    </div>
  );
}
