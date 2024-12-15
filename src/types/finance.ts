export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
}

export interface Budget {
  category: string;
  limit: number;
  spent: number;
}

export interface FinanceStats {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}