'use client';

import React from 'react';
import { MondayUser } from '../../types/monday';
import { Calendar, Building, Users } from 'lucide-react';

import { Avatar, Loader } from '@vibe/core';
import ErrorMessage from '../error-message';
import { formatDate } from '@/lib/format-date';

interface UserProfileProps {
  user: MondayUser | null;
  loading: boolean;
  error: string | null;
}

export default function UserProfile({ user, loading, error }: UserProfileProps) {
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

  if (!user) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Usuário não encontrado</h3>
        <p className="text-gray-500">Não foi possível carregar as informações do perfil.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 shadow-sm overflow-hidden w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-violet-200 px-6 py-5 flex flex-col sm:flex-row items-center gap-4">
        <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-md overflow-hidden flex items-center justify-center">
          {user.photo_original ? (
            <Avatar
              src={user.photo_original}
              type="img"
              withoutBorder
              className="w-full h-full object-cover rounded-full "
            />
          ) : (
            <div className="w-full h-full bg-violet-100 flex items-center justify-center">
              <span className="text-violet-600 font-bold text-4xl">
                {user.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-bold text-violet-600 ">{user.name}</h1>
          <p className="text-gray-600">{user.title || 'Usuário da Monday.com'}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Informações da Conta */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Informações da Conta</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-500 text-sm">E-mail</p>
              <p className="text-gray-900">{user.email}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">ID do Usuário</p>
              <p className="text-gray-900">{user.id}</p>
            </div>

            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-violet-600 " />
              <div>
                <p className="text-gray-500 text-sm">Membro desde</p>
                <p className="text-gray-900">{formatDate(user.created_at)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Organização */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Organização</h2>
          <div className="space-y-4">
            {user.account && (
              <div className="flex items-center gap-2">
                <Building size={18} className="text-violet-600" />
                <div>
                  <p className="text-gray-500 text-sm">Conta</p>
                  <p className="text-gray-900">{user.account.name}</p>
                </div>
              </div>
            )}

            {user.teams && user.teams.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Users size={18} className="text-violet-600" />
                  <p className="text-gray-500 text-sm">Equipes</p>
                </div>

                <div className="space-y-2">
                  {user.teams.map((team) => (
                    <div
                      key={team?.id}
                      className="bg-gray-50 px-3 py-2 rounded-md text-gray-800 text-sm"
                    >
                      {team?.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div >
  );
}
