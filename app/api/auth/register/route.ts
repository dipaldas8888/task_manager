import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import connectDB from "@/lib/db";
import { registerSchema } from "@/lib/validation";

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  const parsed = registerSchema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json({ error: parsed.error }, { status: 400 });

  const hashed = await bcrypt.hash(body.password, 10);
  const user = await User.create({ email: body.email, password: hashed });

  return NextResponse.json(user);
}
