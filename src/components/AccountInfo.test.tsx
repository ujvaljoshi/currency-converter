import { render, screen } from "@testing-library/react";
import AccountInfo from "./AccountInfo";

const props = {
  currencyName: "USD",
  accountValue: 100,
};

test("renders Currency Exchanger link", () => {
  render(<AccountInfo {...props} />);
  const linkElement = screen.getByTestId("account-info");
  expect(linkElement).toBeInTheDocument();
});

test("renders correct text", () => {
  render(<AccountInfo {...props} />);
  const element = screen.getByTestId("account-info");
  expect(element).toHaveTextContent("USD: 100");
});
