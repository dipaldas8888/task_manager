// =============================
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Task from "@/models/Task";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { taskSchema } from "@/lib/validation";
import { encrypt } from "@/lib/encrypt";

export async function GET() {
  await connectDB();
  const token = (await cookies()).get("token")?.value;
  const decoded: any = verifyToken(token!);

  const tasks = await Task.find({ userId: decoded.userId });
  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  await connectDB();
  const token = (await cookies()).get("token")?.value;
  const decoded: any = verifyToken(token!);

  const body = await req.json();

  const parsed = taskSchema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json({ error: parsed.error }, { status: 400 });

  const encryptedDesc = encrypt(body.description);

  const task = await Task.create({
    title: body.title,
    description: encryptedDesc,
    status: body.status,
    userId: decoded.userId,
  });

  return NextResponse.json(task);
}
