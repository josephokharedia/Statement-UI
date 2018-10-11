export interface Transaction {
  _id: string;
  accountNumber: string;
  description: string;
  amount: Number;
  balance: Number;
  hash: string;
}
