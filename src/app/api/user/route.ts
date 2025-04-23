import { NextResponse } from "next/server";

import { MondayUser } from "@/types/monday";
import { mondayFetch } from "@/lib/monday-fetch-api-client";

export async function GET() {

  const query = `
    query {
      me {
        id
        name
        email
        photo_thumb_small
        photo_original
        title
        account {
          id
          name
        }
        created_at
        teams {
          id
          name
        }
      }
    }
  `;

  try {
    const data = await mondayFetch<{ me: MondayUser }>(query);

    if (!data.me) {
      return NextResponse.json({ error: "Nenhum usuário encontrado" }, { status: 404 });
    }

    return NextResponse.json(data.me, { status: 200 });
  } catch (error) {
    console.error("❌ Erro ao buscar usuário:", error);
    return NextResponse.json({ error: "Erro ao buscar usuário" }, { status: 500 });
  }
}
