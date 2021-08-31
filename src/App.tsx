import { useState, useEffect } from "react";
import "./App.css";
import CurrencyRow from "./components/CurrencyRow";
import AccountInfo from "./components/AccountInfo";
import {
  AccountsStructure,
  ExchangeStructure,
  ResposeStructure,
} from "./interfaces";

const ACCOUNTS = {
  USD: 500,
  EUR: 500,
  GBP: 500,
};

function App() {
  const [currencyList, setCurrencyList] = useState<string[]>([]);
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>("");
  const [toCurrency, setToCurrency] = useState<string>("");
  const [exchangeData, setExchangeData] = useState<ExchangeStructure>({});
  const [exchangeRate, setExchangeRate] = useState<number>(1);
  const [amountInFromCurrency, setAmountInFromCurrency] =
    useState<boolean>(true);
  const [accounts, setAccounts] = useState<AccountsStructure>(ACCOUNTS);
  const [error, setError] = useState<string>("");

  let maxFromAccount = fromCurrency ? accounts[fromCurrency] : "";
  let maxToAccount = toCurrency ? accounts[toCurrency] : "";

  let toAmount: number, fromAmount: number;
  if (amountInFromCurrency && exchangeRate) {
    fromAmount = amount;
    toAmount = parseFloat((amount * exchangeRate).toFixed(2));
  } else {
    toAmount = amount;
    fromAmount = parseFloat((amount / exchangeRate).toFixed(2));
  }

  useEffect(() => {
    requestExchangeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      setExchangeRate(exchangeData[toCurrency]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromCurrency, toCurrency]);

  async function requestExchangeData() {
    const res = await fetch(
      `https://openexchangerates.org/api/latest.json?app_id=4ba6e647645c435bab3afabe4b3e4dee&symbols=GBP,EUR`
    );
    const response: ResposeStructure = await res.json();

    let newData: ExchangeStructure = {};
    newData = Object.assign({}, response.rates);
    newData[response.base] = 1;
    setExchangeData(newData);

    setCurrencyList([response.base, ...Object.keys(response.rates)]);
    setFromCurrency(response.base);
    setToCurrency(Object.keys(response.rates)[0]);
    setExchangeRate(exchangeData[toCurrency]);
  }

  function handleAmountChange(
    e: React.FormEvent<HTMLInputElement>,
    isFromAmount: boolean
  ) {
    const re = /^[0-9]*(\.[0-9]{0,2})?$/;
    if (e.currentTarget.value === "" || re.test(e.currentTarget.value)) {
      setAmount(parseFloat(e.currentTarget.value));
    }
    setAmountInFromCurrency(isFromAmount);
  }

  const handleFromCurrencyList = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newExchangeData: ExchangeStructure = {};
    const newRates = currencyList.filter(
      (currency: string) => currency !== e.currentTarget.value
    );
    newRates.map((currency: string) => {
      newExchangeData[currency] = parseFloat(
        (exchangeData[currency] / exchangeData[e.currentTarget.value]).toFixed(
          2
        )
      );
      return 0;
    });
    newExchangeData[e.currentTarget.value] = 1;
    setExchangeData(newExchangeData);
    setFromCurrency(e.currentTarget.value);
  };

  const handleToCurrencyList = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToCurrency(e.currentTarget.value);
  };

  const exchangeCurrency = () => {
    const newAccounts = Object.assign({}, accounts);
    newAccounts[fromCurrency] = newAccounts[fromCurrency] - fromAmount;
    newAccounts[toCurrency] = newAccounts[toCurrency] + toAmount;
    if (newAccounts[fromCurrency] > 0) {
      setAccounts(newAccounts);
      setAmount(1);
    } else {
      setError("You dont have enough money");
    }
  };

  return (
    <div className="app">
      <div className="app-converter">
        <h1>Currency Exchanger</h1>

        {currencyList.map((currency: string) => (
          <AccountInfo
            accountValue={accounts[currency]}
            currencyName={currency}
            key={currency}
          />
        ))}
        <form action="#">
          <CurrencyRow
            currencyOptions={currencyList}
            selectedCurrency={fromCurrency}
            onChangeCurrency={handleFromCurrencyList}
            onChangeAmount={(e: React.FormEvent<HTMLInputElement>) =>
              handleAmountChange(e, true)
            }
            amount={fromAmount}
            maxValue={maxFromAccount.toString()}
          />

          <CurrencyRow
            currencyOptions={currencyList}
            selectedCurrency={toCurrency}
            onChangeCurrency={handleToCurrencyList}
            onChangeAmount={(e: React.FormEvent<HTMLInputElement>) =>
              handleAmountChange(e, false)
            }
            amount={toAmount}
            maxValue={maxToAccount.toString()}
          />

          <button
            className="exchange-button"
            onClick={exchangeCurrency}
            data-testid="exchange-button"
          >
            Exchange
          </button>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default App;
