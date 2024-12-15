export interface Member {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member';
  department: string;
  joinDate: string;
}

export interface MemberTransaction extends Transaction {
  memberId: string;
}