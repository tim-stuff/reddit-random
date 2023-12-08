export type HashDetails = {
  status: string;
  error: string;
  errorMessage: string | null;
};

export type AddressBalance = string;

export type NormalTransaction = {
  hash: string;
  to: string;
  value: string;
  timeStamp: string;
  from: string;
  functionName: string;
};

export type TokenTransfer = {
  hash: string;
  timeStamp: string;
  from: string;
  to: string;
  value: string;
  method: string;
};
