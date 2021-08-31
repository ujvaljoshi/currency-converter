const CurrencyRow = ({
  currencyOptions,
  selectedCurrency,
  onChangeCurrency,
  onChangeAmount,
  amount,
  maxValue,
}: {
  currencyOptions: string[];
  selectedCurrency: string;
  onChangeCurrency: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeAmount: (e: React.FormEvent<HTMLInputElement>) => void;
  amount: number;
  maxValue: string;
}): JSX.Element => {
  return (
    <div>
      <input
        type="number"
        className="input"
        value={amount}
        onChange={onChangeAmount}
        data-testid="currency-input"
        max={maxValue}
      />
      <select
        value={selectedCurrency}
        onChange={onChangeCurrency}
        data-testid="currency-select"
      >
        {currencyOptions.map((option: string) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencyRow;
