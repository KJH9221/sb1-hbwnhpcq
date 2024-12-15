import React from 'react';
import { FileSpreadsheet } from 'lucide-react';
import { exportMemberSummary } from '../utils/excel';
import type { Member } from '../types/member';
import type { Transaction } from '../types/finance';

interface ExportButtonProps {
  members: Member[];
  transactions: Transaction[];
}

export function ExportButton({ members, transactions }: ExportButtonProps) {
  return (
    <button
      onClick={() => exportMemberSummary(members, transactions)}
      className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
    >
      <FileSpreadsheet className="h-5 w-5" />
      <span>엑셀로 내보내기</span>
    </button>
  );
}