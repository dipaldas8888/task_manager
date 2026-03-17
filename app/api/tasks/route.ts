// =============================
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Task from "@/models/Task";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { taskSchema } from "@/lib/validation";
import { encrypt, decrypt } from "@/lib/encrypt";

export async function GET(req: Request) {
  await connectDB();

  try {
    const token = (await cookies()).get("token")?.value;

    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded: any = verifyToken(token);

    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "5");
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const query: any = { userId: decoded.userId };

    if (status) query.status = status;

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const tasks = await Task.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Task.countDocuments(query);

    const decryptedTasks = tasks.map((task) => ({
      ...task._doc,
      description: decrypt(task.description),
    }));

    return NextResponse.json({
      tasks: decryptedTasks,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
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
