import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders Currency Exchanger link", () => {
  render(<App />);
  const linkElement = screen.getByText(/CURRENCY EXCHANGER/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders exchange button", () => {
  render(<App />);
  const element = screen.getByTestId("exchange-button");
  expect(element).toBeInTheDocument();
});

test("Check flow of exchange button", () => {
  render(<App />);
  const element = screen.getAllByTestId("account-info");
  expect(element[0]).toHaveTextContent("USD: 500");

  const button = screen.getByTestId("exchange-button");
  fireEvent.click(button);
  expect(element[0]).toHaveTextContent("USD: 499");
});
