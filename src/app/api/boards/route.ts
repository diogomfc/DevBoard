import { NextResponse } from "next/server";

import { MondayBoard } from "@/types/monday";
import { mondayFetch } from "@/lib/monday-fetch-api-client";

export async function GET() {
  const query = `
    query {
      boards {
        id
        name
        description
        state
        board_kind
        updated_at
        workspace_id
        items_count
        board_folder_id
        creator {
          id
          name
          email
          photo_thumb_small
        }
      }
    }
  `;

  try {
    const data = await mondayFetch<{ boards: MondayBoard[] }>(query);

    if (!data.boards || data.boards.length === 0) {
      return NextResponse.json({ error: "Nenhum board encontrado" }, { status: 404 });
    }

    return NextResponse.json(data.boards, { status: 200 });
  } catch (error) {
    console.error("❌ Erro ao buscar boards:", error);
    return NextResponse.json({ error: "Erro ao buscar boards" }, { status: 500 });
  }
}
