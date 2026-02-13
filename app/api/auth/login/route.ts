import { NextResponse } from "next/server";
import { db, TABLE_NAME, ensureTableExists } from "@/lib/dynamodb";
import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { comparePassword, signToken } from "@/lib/auth";
import { serialize } from "cookie";

export async function POST(req: Request) {
  try {
    await ensureTableExists();

    const { email, password } = await req.json();

    // 1. Get User
    const { Item } = await db.send(new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        pk: `USER#${email}`,
        sk: `METADATA`
      }
    }));

    if (!Item) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // 2. Validate Password
    const isValid = await comparePassword(password, Item.password_hash);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // 3. Create Session Token
    const token = signToken({ 
      id: Item.id, 
      email: Item.email, 
      role: Item.role,
      name: Item.name 
    });

    // 4. Set Cookie
    const cookieSerialized = serialize("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    return new NextResponse(JSON.stringify({ success: true, role: Item.role }), {
      status: 200,
      headers: { "Set-Cookie": cookieSerialized, "Content-Type": "application/json" },
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}