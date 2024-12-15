import { utils, writeFile } from 'xlsx';
import type { Member } from '../types/member';
import type { Transaction } from '../types/finance';

interface MemberSummary {
  name: string;
  department: string;
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

export function exportMemberSummary(members: Member[], transactions: Transaction[]) {
  // 회원별 거래 내역 집계
  const summaries: MemberSummary[] = members.map(member => {
    const memberTransactions = transactions.filter(t => t.memberId === member.id);
    const totalIncome = memberTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = memberTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      name: member.name,
      department: member.department,
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense
    };
  });

  // 엑셀 워크북 생성
  const wb = utils.book_new();
  
  // 회원별 요약 시트
  const summaryWs = utils.json_to_sheet(summaries.map(s => ({
    '이름': s.name,
    '부서': s.department,
    '총 수입': s.totalIncome,
    '총 지출': s.totalExpense,
    '잔액': s.balance
  })));

  // 열 너비 설정
  const colWidths = [
    { wch: 15 }, // 이름
    { wch: 15 }, // 부서
    { wch: 15 }, // 총 수입
    { wch: 15 }, // 총 지출
    { wch: 15 }, // 잔액
  ];
  summaryWs['!cols'] = colWidths;

  utils.book_append_sheet(wb, summaryWs, '회원별 요약');

  // 상세 거래내역 시트
  const detailsWs = utils.json_to_sheet(transactions.map(t => {
    const member = members.find(m => m.id === t.memberId);
    return {
      '날짜': t.date,
      '회원명': member?.name || '',
      '부서': member?.department || '',
      '설명': t.description,
      '카테고리': t.category,
      '유형': t.type === 'income' ? '수입' : '지출',
      '금액': t.amount
    };
  }));

  // 열 너비 설정
  const detailColWidths = [
    { wch: 12 }, // 날짜
    { wch: 12 }, // 회원명
    { wch: 12 }, // 부서
    { wch: 20 }, // 설명
    { wch: 12 }, // 카테고리
    { wch: 8 },  // 유형
    { wch: 12 }, // 금액
  ];
  detailsWs['!cols'] = detailColWidths;

  utils.book_append_sheet(wb, detailsWs, '상세 거래내역');

  // 파일 저장
  writeFile(wb, '회원별_자금관리_보고서.xlsx');
}