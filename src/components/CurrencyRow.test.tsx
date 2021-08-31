import { render, screen } from "@testing-library/react";
import CurrencyRow from "./CurrencyRow";

const props = {
  currencyOptions: ["USD", "EUR"],
  selectedCurrency: "USD",
  onChangeCurrency: jest.fn(),
  onChangeAmount: jest.fn(),
  amount: 1,
};

test("renders input for currency", () => {
  render(<CurrencyRow {...props} />);
  const linkElement = screen.getByTestId("currency-input");
  expect(linkElement).toBeInTheDocument();
});

test("renders select dropdown", () => {
  render(<CurrencyRow {...props} />);
  const element = screen.getByTestId("currency-select");
  expect(element).toBeInTheDocument();
});
