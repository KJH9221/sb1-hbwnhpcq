import type { Transaction } from '../types/finance';

export interface FilterOptions {
  startDate?: string;
  endDate?: string;
  type?: 'income' | 'expense' | 'all';
  category?: string;
  searchQuery?: string;
}

export function filterTransactions(
  transactions: Transaction[],
  filters: FilterOptions
): Transaction[] {
  return transactions.filter(transaction => {
    if (filters.startDate && transaction.date < filters.startDate) return false;
    if (filters.endDate && transaction.date > filters.endDate) return false;
    if (filters.type && filters.type !== 'all' && transaction.type !== filters.type) return false;
    if (filters.category && transaction.category !== filters.category) return false;
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      return (
        transaction.description.toLowerCase().includes(query) ||
        transaction.category.toLowerCase().includes(query)
      );
    }
    return true;
  });
}