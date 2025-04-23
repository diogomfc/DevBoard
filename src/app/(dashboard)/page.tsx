"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LayoutDashboard, Users, Database } from "lucide-react";

import { MondayUser, MondayBoard } from "@/types/monday";
import BoardsList from "@/components/boards/board-list";
import DashboardCard from "@/components/dashboard-cards";

export default function DashboardPage() {
  const [user, setUser] = useState<MondayUser | null>(null);
  const [boards, setBoards] = useState<MondayBoard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [userRes, boardsRes] = await Promise.all([
        fetch("/api/user"),
        fetch("/api/boards"),
      ]);

      if (!userRes.ok || !boardsRes.ok) {
        throw new Error("Erro ao buscar dados");
      }

      const userData = await userRes.json();
      const boardsData = await boardsRes.json();

      setUser(userData);
      setBoards(boardsData);
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar dados.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {user ? `Bem-vindo, ${user.name}!` : "Bem-vindo ao App DevBoard!"}
        </h1>
        <p className="text-gray-600">
          Aqui você pode gerenciar seus quadros e acessar sua conta.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <DashboardCard
          title="Seus Quadros"
          description="Gerencie e visualize seus quadros"
          icon={<LayoutDashboard size={24} className="text-indigo-600" />}
          iconBg="bg-indigo-100"
          href="/boards"
          borderColor="border-indigo-200"
          hoverBg="hover:bg-indigo-600"
          hoverText="hover:text-white"
        />
        <DashboardCard
          title="Seu Perfil"
          description="Visualize os dados da sua conta"
          icon={<Users size={24} className="text-purple-600" />}
          iconBg="bg-purple-100"
          href="/profile"
          borderColor="border-purple-200"
          hoverBg="hover:bg-purple-600"
          hoverText="hover:text-white"
        />
        <DashboardCard
          title="Documentação da API"
          description="Aprenda mais sobre a API do Monday.com"
          icon={<Database size={24} className="text-blue-600" />}
          iconBg="bg-blue-100"
          href="https://developer.monday.com/api-reference/docs"
          external
          borderColor="border-blue-200"
          hoverBg="hover:bg-blue-600"
          hoverText="hover:text-white"
        />
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Quadros Recentes
        </h2>
        <BoardsList
          boards={boards.slice(0, 3)}
          loading={loading}
          error={error}
        />

        {boards.length > 3 && (
          <div className="mt-6 text-center">
            <Link
              href="/boards"
              className="inline-block bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200 rounded-md px-5 py-2.5 text-sm font-medium"
            >
              Ver Todos os Quadros
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
