import { DynamoDBClient, CreateTableCommand, DescribeTableCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env.MY_AWS_REGION,
  credentials: {
    accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY!,
  },
});

const db = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || "SovereignSuites";

// Self-healing: Check if table exists, if not, create it.
export async function ensureTableExists() {
  try {
    await client.send(new DescribeTableCommand({ TableName: TABLE_NAME }));
    // Table exists
  } catch (e: any) {
    if (e.name === "ResourceNotFoundException") {
      console.log("Table not found. Creating table...");
      await client.send(
        new CreateTableCommand({
          TableName: TABLE_NAME,
          KeySchema: [
            { AttributeName: "pk", KeyType: "HASH" }, // Partition Key
            { AttributeName: "sk", KeyType: "RANGE" }, // Sort Key
          ],
          AttributeDefinitions: [
            { AttributeName: "pk", AttributeType: "S" },
            { AttributeName: "sk", AttributeType: "S" },
          ],
          BillingMode: "PAY_PER_REQUEST", // Serverless billing
        })
      );
      // Wait a moment for table to propagate
      await new Promise((resolve) => setTimeout(resolve, 5000));
      console.log("Table created successfully!");
    } else {
      throw e;
    }
  }
}

export { db, TABLE_NAME };