import React from 'react';
import { Pencil, Trash2, UserPlus } from 'lucide-react';
import type { Member } from '../../types/member';

interface MemberListProps {
  members: Member[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
  onSelect: (member: Member) => void;
  selectedMemberId?: string;
}

export function MemberList({
  members,
  onEdit,
  onDelete,
  onAdd,
  onSelect,
  selectedMemberId
}: MemberListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold">회원 목록</h2>
        <button
          onClick={onAdd}
          className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-900"
        >
          <UserPlus className="h-5 w-5" />
          <span>회원 추가</span>
        </button>
      </div>
      <div className="divide-y divide-gray-200">
        {members.map((member) => (
          <div
            key={member.id}
            className={`p-4 hover:bg-gray-50 cursor-pointer flex justify-between items-center
              ${selectedMemberId === member.id ? 'bg-indigo-50' : ''}`}
            onClick={() => onSelect(member)}
          >
            <div>
              <h3 className="text-sm font-medium text-gray-900">{member.name}</h3>
              <p className="text-sm text-gray-500">{member.department}</p>
              <p className="text-xs text-gray-400">{member.email}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(member.id);
                }}
                className="text-indigo-600 hover:text-indigo-900"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(member.id);
                }}
                className="text-red-600 hover:text-red-900"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}