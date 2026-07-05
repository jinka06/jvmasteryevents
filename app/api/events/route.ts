import { NextRequest, NextResponse } from "next/server";
import { createEvent, getAllEvents } from "@/db/event.model";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    let event: Record<string, unknown>;
    try {
      event = Object.fromEntries(formData.entries());
      event.agenda = formData.getAll("agenda");
      event.tags = formData.getAll("tags");
    } catch (e) {
      return NextResponse.json({ message: "Invalid form data format" }, { status: 400 });
    }

    const createdEvent = await createEvent(event);

    return NextResponse.json(
      { message: "Event created successfully", event: createdEvent },
      { status: 201 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Event creation failed", error: e instanceof Error ? e.message : "unknown" },
      { status: 500 }
    );
  }
}

export async function GET(){
    try{
        const events = await getAllEvents();
        return NextResponse.json({ message: 'Events fetched successfully', events}, {status: 200})
    } catch(e){
        return NextResponse.json({ message: "Event fetching failed", error: e instanceof Error ? e.message : "unknown" },
      { status: 500 })
    }
}