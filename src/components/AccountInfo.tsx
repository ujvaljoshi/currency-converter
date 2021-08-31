const AccountInfo = ({
  currencyName,
  accountValue,
}: {
  currencyName: string;
  accountValue: number;
}): JSX.Element => (
  <span className="account-pill" data-testid="account-info">
    {currencyName}: {parseFloat(accountValue.toFixed(2))}
  </span>
);

export default AccountInfo;
