import React from 'react';
import { MondayBoard } from '../../types/monday';

import { Loader } from '@vibe/core';
import ErrorMessage from '../error-message';
import BoardCard from './board-card';

interface BoardsListProps {
  boards: MondayBoard[];
  loading: boolean;
  error: string | null;
}

export default function BoardsList({ boards, loading, error }: BoardsListProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Loader size="large" />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} className="my-4" />;
  }

  if (!boards || boards.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <h3 className="text-lg font-medium text-gray-700 mb-2">
          No Boards Available
        </h3>
        <p className="text-gray-500">
          You currently have no boards linked to your Monday.com account.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {boards.map((board, index) => (
        <BoardCard key={board.id} board={board} loading={false} error={null} />
      ))}
    </div>
  );
}
