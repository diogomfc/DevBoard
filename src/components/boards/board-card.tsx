'use client';

import React from 'react';
import { MondayBoard } from '../../types/monday';
import { Layers, Clock } from 'lucide-react';
import { Loader } from '@vibe/core';
import ErrorMessage from '../error-message';
import { formatDate } from '@/lib/format-date';

interface BoardCardProps {
  board: MondayBoard | null;
  loading: boolean;
  error: string | null;
}


const getBoardTypeColor = (kind?: string) => {
  switch (kind) {
    case 'public':
      return 'bg-green-100 text-green-800';
    case 'private':
      return 'bg-amber-100 text-amber-800';
    case 'share':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function BoardCard({ board, loading, error }: BoardCardProps) {

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader size="large" />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} className="my-4" />;
  }

  if (!board) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Placa não encontrada</h3>
        <p className="text-gray-500">Não foi possível carregar as informações do quadro.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 shadow-sm overflow-hidden w-full max-w-sm mx-auto">
      {/* Header */}
      <div className={`bg-indigo-50 px-5 py-4 flex items-center justify-between`}>
        <div className="flex items-center gap-2 text-indigo-700 font-semibold text-lg">
          <Layers size={20} />
          {board.name}
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-full border ${getBoardTypeColor(
            board.board_kind
          )}`}
        >
          {board.board_kind || 'Unknown'}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <div className="flex items-center gap-3">
          <Layers size={18} className="text-indigo-500" />
          <div>
            <p className="text-sm text-gray-500">
              Contagem de itens</p>
            <p className="text-base font-medium text-gray-800">{board.items_count ?? 'N/A'}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Clock size={18} className="text-indigo-500" />
          <div>
            <p className="text-sm text-gray-500">Última atualização</p>
            <p className="text-base font-medium text-gray-800">{formatDate(board.updated_at)}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={`bg-indigo-50 px-5 py-3`}>
        <button className="w-full text-indigo-700 border border-indigo-600 hover:bg-white font-medium py-2 rounded-md transition text-sm">
          Ver quadro
        </button>
      </div>
    </div>
  );
}
