import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { notes } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const allNotes = await db
      .select()
      .from(notes)
      .orderBy(desc(notes.pinned), desc(notes.updatedAt));
    return NextResponse.json(allNotes);
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    return NextResponse.json({ error: "Failed to fetch notes" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, content, color, style, shapes, tasks } = body;

    if (!title || !title.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const [note] = await db
      .insert(notes)
      .values({
        title: title.trim(),
        content: content || null,
        color: color || "default",
        style: style || "solid",
        shapes: shapes || [],
        tasks: tasks || [],
      })
      .returning();

    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    console.error("Failed to create note:", error);
    return NextResponse.json({ error: "Failed to create note" }, { status: 500 });
  }
}
