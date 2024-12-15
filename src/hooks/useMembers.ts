import { useState, useCallback } from 'react';
import type { Member } from '../types/member';

export function useMembers(initialMembers: Member[] = []) {
  const [members, setMembers] = useState<Member[]>(initialMembers);

  const addMember = useCallback((newMember: Omit<Member, 'id'>) => {
    const member: Member = {
      ...newMember,
      id: Date.now().toString()
    };
    setMembers(prev => [...prev, member]);
  }, []);

  const editMember = useCallback((id: string, updates: Partial<Omit<Member, 'id'>>) => {
    setMembers(prev =>
      prev.map(member =>
        member.id === id ? { ...member, ...updates } : member
      )
    );
  }, []);

  const deleteMember = useCallback((id: string) => {
    setMembers(prev => prev.filter(member => member.id !== id));
  }, []);

  return {
    members,
    addMember,
    editMember,
    deleteMember
  };
}