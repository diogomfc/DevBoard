import { ApiClient, ClientError } from "@mondaydotcomorg/api";

const token = process.env.MONDAY_API_TOKEN;

if (!token) {
  throw new Error("⚠️ Variável MONDAY_API_TOKEN não definida.");
}

const mondayApiClient = new ApiClient({ token });

export { mondayApiClient, ClientError };
