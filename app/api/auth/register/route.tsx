
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { connection } from "../../../utils/models/db";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    // YOU MAY WANT TO ADD SOME VALIDATION HERE

    //console.log({ email, password });

    const hashedPassword = await hash(password, 10);
    const response = await connection.query(`INSERT INTO Usuario (email, pass) VALUES (?, ?)`, [email, hashedPassword]);
  } catch (e) {
    console.log({ e });
  }

  return NextResponse.json({ message: "success" });
}