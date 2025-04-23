"use client";

import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { MondayUser } from "@/types/monday";
import UserProfile from "@/components/profile/user-profile";

export default function ProfilePage() {
  const [user, setUser] = useState<MondayUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/user");
      if (!res.ok) {
        throw new Error("Erro ao buscar dados do usuário");
      }

      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar as informações do usuário.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Seu Perfil</h1>
          <p className="text-gray-600">
            Visualize as informações da sua conta no Monday.com
          </p>
        </div>

        <button
          onClick={fetchUser}
          disabled={loading}
          className="flex items-center gap-2 bg-white text-gray-700 border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50 transition-colors duration-200 text-sm font-medium disabled:opacity-50"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Atualizar
        </button>
      </div>

      <UserProfile user={user} loading={loading} error={error} />
    </main>
  );
}
