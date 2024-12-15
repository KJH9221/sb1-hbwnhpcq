import React from 'react';
import { Building2 } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-indigo-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Building2 size={24} />
          <h1 className="text-xl font-bold">회사 자금관리 시스템</h1>
        </div>
        <nav className="flex space-x-4">
          <button className="hover:bg-indigo-500 px-3 py-1 rounded">대시보드</button>
          <button className="hover:bg-indigo-500 px-3 py-1 rounded">거래내역</button>
          <button className="hover:bg-indigo-500 px-3 py-1 rounded">예산관리</button>
          <button className="hover:bg-indigo-500 px-3 py-1 rounded">보고서</button>
        </nav>
      </div>
    </header>
  );
}