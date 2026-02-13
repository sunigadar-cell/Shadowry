import { NextResponse } from "next/server";
import { db, TABLE_NAME, ensureTableExists } from "@/lib/dynamodb";
import { PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { hashPassword } from "@/lib/auth";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    await ensureTableExists(); // Auto-create table on first run
    
    const body = await req.json();
    const { email, password, role, name } = body;

    if (!email || !password || !role) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // 1. Check if user exists
    // We use a Single Table Design pattern. 
    // PK: USER#{email} ensures email uniqueness.
    const userCheck = await db.send(new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        pk: `USER#${email}`,
        sk: `METADATA`
      }
    }));

    if (userCheck.Item) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    // 2. Hash Password
    const passwordHash = await hashPassword(password);
    const userId = uuidv4();
    const createdAt = new Date().toISOString();

    // 3. Save User
    await db.send(new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        pk: `USER#${email}`,
        sk: `METADATA`,
        id: userId,
        email,
        password_hash: passwordHash,
        role, // "OWNER" or "GUEST"
        name,
        createdAt,
        type: "USER" // For indexing later if needed
      }
    }));

    return NextResponse.json({ success: true, message: "Account created" });

  } catch (error: any) {
    console.error("Register Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}