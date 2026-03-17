import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Task from "@/models/Task";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { taskSchema } from "@/lib/validation";
import { encrypt } from "@/lib/encrypt";

export async function PUT(req: Request, { params }: any) {
  await connectDB();

  try {
    const token = (await cookies()).get("token")?.value;

    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded: any = verifyToken(token);

    const task = await Task.findById(params.id);
    if (!task)
      return NextResponse.json({ error: "Task not found" }, { status: 404 });

    if (task.userId.toString() !== decoded.userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();

    const parsed = taskSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const encryptedDesc = encrypt(body.description);

    const updated = await Task.findByIdAndUpdate(
      params.id,
      {
        title: body.title,
        description: encryptedDesc,
        status: body.status,
      },
      { new: true },
    );

    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: any) {
  await connectDB();

  try {
    const token = (await cookies()).get("token")?.value;

    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded: any = verifyToken(token);

    const task = await Task.findById(params.id);
    if (!task)
      return NextResponse.json({ error: "Task not found" }, { status: 404 });

    if (task.userId.toString() !== decoded.userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await Task.findByIdAndDelete(params.id);

    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
