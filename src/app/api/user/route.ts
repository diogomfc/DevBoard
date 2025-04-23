import { NextResponse } from "next/server";
import { mondayApiClient } from "../../../lib/manday-api-client";
import { MondayUser } from "@/types/monday";


export async function GET() {
  try {
    const response = await mondayApiClient.request<{ me: MondayUser }>(`
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
    `);

    const result = response?.me;

    if (!result) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Erro na API do Monday:", error);
    return NextResponse.json({ error: "Erro ao buscar usuário" }, { status: 500 });
  }
}
