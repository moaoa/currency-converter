import React from "react";
import "./App.css";
import ConvertRow from "./ConvertRow";
import { useState, useEffect } from "react";
const url = "https://fixer-fixer-currency-v1.p.rapidapi.com";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [rates, setRates] = useState([]);
  const [fromInput, setFromInput] = useState(true);
  const [amount, setAmount] = useState(1);
  let fromAmount, toAmount;

  console.log(rates);
  if (fromInput) {
    fromAmount = amount;
    toAmount = amount * rates[toCurrency];
  } else {
    toAmount = amount;
    fromAmount = amount / rates[toCurrency];
    console.log("fromCurrency: " + rates[toCurrency]);
  }

  const handleFromInput = e => {
    setFromInput(true);
    setAmount(e.target.value);
  };
  const handleToInput = e => {
    setFromInput(false);
    setAmount(e.target.value);
  };
  useEffect(() => {
    fetch("https://fixer-fixer-currency-v1.p.rapidapi.com/symbols", {
      headers: {
        "x-rapidapi-host": "fixer-fixer-currency-v1.p.rapidapi.com",
        "x-rapidapi-key": "a8cc4227b9msha395641aef6b1e5p146a01jsn767c2ef03f6b"
      }
    })
      .then(res => res.json())
      .then(data => {
        setCurrencyOptions(Object.keys(data.symbols));
      });
  }, []);

  useEffect(() => {
    const symbosToSend = currencyOptions
      .splice(currencyOptions.indexOf(fromCurrency))
      .toLocaleString();
    fetch(`${url}/latest?base=${fromCurrency}&symbols=${symbosToSend}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "fixer-fixer-currency-v1.p.rapidapi.com",
        "x-rapidapi-key": "a8cc4227b9msha395641aef6b1e5p146a01jsn767c2ef03f6b"
      }
    })
      .then(res => res.json())
      .then(data => {
        setRates(data.rates);
        console.log(rates);
      });
  }, [fromCurrency]);

  return (
    <div className="App">
      <h1>Convert</h1>

      <ConvertRow
        selectedCurrency={fromCurrency}
        currencyOptions={currencyOptions}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        handleInput={handleFromInput}
        amount={fromAmount}
      />
      <div className="equal">=</div>
      <ConvertRow
        selectedCurrency={toCurrency}
        currencyOptions={currencyOptions}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        handleInput={handleToInput}
        amount={toAmount}
      />
    </div>
  );
}

export default App;
