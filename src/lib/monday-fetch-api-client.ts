export async function mondayFetch<T = any>(query: string): Promise<T> {
  const token = process.env.MONDAY_API_TOKEN;

  if (!token) {
    throw new Error("MONDAY_API_TOKEN não está definida.");
  }

  const response = await fetch("https://api.monday.com/v2", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ query }),
    cache: "no-store", // importante para evitar cache no build
  });

  const json = await response.json();

  if (!response.ok || json.errors) {
    console.error("Erro na API Monday:", json.errors);
    throw new Error("Erro ao buscar dados da API Monday.");
  }

  return json.data;
}
