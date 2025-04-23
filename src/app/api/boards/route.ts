import { NextResponse } from "next/server";
import { mondayApiClient } from "@/lib/manday-api-client";
import { MondayBoard } from "@/types/monday";

export async function GET() {
  try {
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

    const response = await mondayApiClient.request<{ boards: MondayBoard[] }>(query);

    const boards = response?.boards;

    if (!boards || boards.length === 0) {
      return NextResponse.json({ error: "Nenhum board encontrado" }, { status: 404 });
    }

    return NextResponse.json(boards, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar boards:", error);
    return NextResponse.json({ error: "Erro ao buscar boards" }, { status: 500 });
  }
}
