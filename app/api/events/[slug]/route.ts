import { NextRequest, NextResponse } from "next/server";
import { getEventBySlug } from "@/db/event.model";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const event = await getEventBySlug(slug);

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Event fetched successfully", event }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "Event fetching failed", error: e instanceof Error ? e.message : "unknown" },
      { status: 500 }
    );
  }
}