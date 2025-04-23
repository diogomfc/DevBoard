"use client";

import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { MondayBoard } from "@/types/monday";
import BoardsList from "@/components/boards/board-list";

export default function BoardsPage() {
  const [boards, setBoards] = useState<MondayBoard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBoards = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/boards", { cache: "no-store" }); // garantido sem cache
      if (!res.ok) throw new Error("Erro ao buscar boards");

      const data = await res.json();
      setBoards(data);
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar os quadros.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Seus Quadros</h1>
          <p className="text-gray-600">Visualize e gerencie seus quadros do Monday.com</p>
        </div>

        <button
          onClick={fetchBoards}
          disabled={loading}
          className="flex items-center gap-2 bg-white text-gray-700 border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50 transition-colors duration-200 text-sm font-medium disabled:opacity-50"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Atualizar
        </button>
      </div>

      <BoardsList boards={boards} loading={loading} error={error} />
    </main>
  );
}
