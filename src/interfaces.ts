export interface ResposeStructure {
  base: string;
  rates: {
    [key: string]: number;
  };
}

export interface ExchangeStructure {
  [key: string]: number;
}

export interface AccountsStructure {
  [key: string]: number;
}