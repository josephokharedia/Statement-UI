export interface Transaction {
  _id: string;
  accountNumber: string;
  description: string;
  amount: Number;
  balance: Number;
  hash: string;
  categories: Category[];
}

export interface Category {
  _id?: string;
  name?: string;
  tags?: string[];
  color?: string;
}
