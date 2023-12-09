export type HashDetails = {
  status: string;
  error: string;
  errorMessage: string | null;
};

export type AddressBalance = string;

export type Transaction = {
  hash: string;
  to: string;
  value: string;
  timeStamp: string;
  from: string;
  method: string;
};
