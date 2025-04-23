import mondaySdk from "monday-sdk-js";

const mondayClient = mondaySdk();

const token = process.env.MONDAY_API_TOKEN;

if (!token) {
  console.warn("⚠️ Variável MONDAY_API_TOKEN não definida.");
} else {
  mondayClient.setToken(token);
}

export { mondayClient };
