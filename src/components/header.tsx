'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Layers } from 'lucide-react';
import { Avatar } from '@vibe/core';

type MondayUser = {
  name: string;
  photo_thumb_small: string;
};

export default function Header() {
  const [user, setUser] = useState<MondayUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch('/api/user');
      if (!res.ok) {
        throw new Error('Erro ao buscar dados do usuário');
      }

      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error(err);
      setError('Erro ao carregar as informações do usuário.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-indigo-600 font-semibold text-xl"
        >
          <Layers size={24} className="text-indigo-600" />
          <span>DevBoards</span>
        </Link>

        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-gray-600 hover:text-indigo-600 transition-colors duration-200"
            >
              Dashboard
            </Link>
            <Link
              href="/boards"
              className="text-gray-600 hover:text-indigo-600 transition-colors duration-200"
            >
              Boards
            </Link>
            <Link
              href="/profile"
              className="text-gray-600 hover:text-indigo-600 transition-colors duration-200"
            >
              Profile
            </Link>
          </nav>

          {loading ? (
            <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
          ) : user ? (
            <div className="flex items-center gap-3">
              <Avatar
                ariaLabel="User Avatar"
                withoutBorder
                onClick={() => { }}
                size="small"
                src={user.photo_thumb_small}
                text={user.name}
                type="img"
                className="hidden md:block"
              />
              <div className="text-sm text-gray-700 hidden md:block">
                {user.name}
              </div>
            </div>
          ) : (
            <div className="text-sm text-red-500">{error}</div>
          )}
        </div>
      </div>
    </header>
  );
}
