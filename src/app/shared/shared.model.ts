export interface Transaction {
  _id: string;
  accountNumber: string;
  description: string;
  amount: Number;
  balance: Number;
  hash: string;
}

export interface Label {
  _id?: string;
  name?: string;
  tags?: string[];
  color?: string;
}
