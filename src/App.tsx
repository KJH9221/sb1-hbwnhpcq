import React, { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { TransactionList } from './components/TransactionList';
import { TransactionFilters } from './components/TransactionFilters';
import { AddTransaction } from './components/AddTransaction';
import { MemberList } from './components/members/MemberList';
import { MemberForm } from './components/members/MemberForm';
import { ExportButton } from './components/ExportButton';
import { useTransactions } from './hooks/useTransactions';
import { useMembers } from './hooks/useMembers';
import { filterTransactions } from './utils/filters';
import type { Member } from './types/member';

const initialMembers: Member[] = [
  {
    id: '1',
    name: '홍길동',
    email: 'hong@company.com',
    role: 'admin',
    department: '경영지원팀',
    joinDate: '2024-01-01'
  }
];

function App() {
  const { transactions, addTransaction, editTransaction, deleteTransaction } = useTransactions([]);
  const { members, addMember, editMember, deleteMember } = useMembers(initialMembers);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [filters, setFilters] = useState({ type: 'all' });

  const handleMemberSelect = (member: Member) => {
    setSelectedMember(member);
  };

  const handleAddMember = () => {
    setEditingMember(null);
    setShowMemberForm(true);
  };

  const handleEditMember = (id: string) => {
    const member = members.find(m => m.id === id);
    if (member) {
      setEditingMember(member);
      setShowMemberForm(true);
    }
  };

  const handleMemberFormSubmit = (memberData: Omit<Member, 'id'>) => {
    if (editingMember) {
      editMember(editingMember.id, memberData);
    } else {
      addMember(memberData);
    }
    setShowMemberForm(false);
    setEditingMember(null);
  };

  const filteredTransactions = filterTransactions(
    transactions.filter(t => !selectedMember || t.memberId === selectedMember.id),
    filters
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">자금관리 시스템</h1>
          <ExportButton members={members} transactions={transactions} />
        </div>

        <Dashboard
          stats={{
            totalIncome: filteredTransactions
              .filter(t => t.type === 'income')
              .reduce((sum, t) => sum + t.amount, 0),
            totalExpense: filteredTransactions
              .filter(t => t.type === 'expense')
              .reduce((sum, t) => sum + t.amount, 0),
            balance: filteredTransactions.reduce((sum, t) => 
              sum + (t.type === 'income' ? t.amount : -t.amount), 0)
          }}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <MemberList
              members={members}
              onEdit={handleEditMember}
              onDelete={deleteMember}
              onAdd={handleAddMember}
              onSelect={handleMemberSelect}
              selectedMemberId={selectedMember?.id}
            />
          </div>
          
          <div className="md:col-span-3">
            {showMemberForm ? (
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-lg font-semibold mb-4">
                  {editingMember ? '회원 정보 수정' : '새 회원 등록'}
                </h2>
                <MemberForm
                  onSubmit={handleMemberFormSubmit}
                  onCancel={() => {
                    setShowMemberForm(false);
                    setEditingMember(null);
                  }}
                  initialData={editingMember || undefined}
                />
              </div>
            ) : (
              <>
                <TransactionFilters
                  filters={filters}
                  onFilterChange={setFilters}
                  categories={Array.from(new Set(transactions.map(t => t.category)))}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <TransactionList
                      transactions={filteredTransactions}
                      onEdit={editTransaction}
                      onDelete={deleteTransaction}
                    />
                  </div>
                  <div>
                    <AddTransaction
                      onAdd={(transaction) => {
                        if (selectedMember) {
                          addTransaction({
                            ...transaction,
                            memberId: selectedMember.id
                          });
                        }
                      }}
                      disabled={!selectedMember}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;