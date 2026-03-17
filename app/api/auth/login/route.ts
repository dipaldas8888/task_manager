import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import connectDB from "@/lib/db";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
  await connectDB();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (!user.password)
    return NextResponse.json({ error: "Invalid" }, { status: 401 });

  const match = await bcrypt.compare(password, user.password);

  if (!match) return NextResponse.json({ error: "Invalid" }, { status: 401 });

  const token = signToken({ userId: user._id });

  const res = NextResponse.json({ message: "ok" });

  res.cookies.set("token", token, { httpOnly: true, secure: true });
  return res;
}
