import pool from "@/db/client";
import { eventInputSchema, generateSlug, type Event } from "@/lib/validation/event";

export async function createEvent(data: unknown): Promise<Event> {
  const parsed = eventInputSchema.parse(data);
  const slug = generateSlug(parsed.title);

  const result = await pool.query(
    `INSERT INTO events (
      title, slug, description, overview, image, venue, location,
      date, time, mode, audience, agenda, organizer, tags
    )
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
     RETURNING *`,
    [
      parsed.title,
      slug,
      parsed.description,
      parsed.overview,
      parsed.image,
      parsed.venue,
      parsed.location,
      parsed.date,
      parsed.time,
      parsed.mode,
      parsed.audience,
      parsed.agenda,
      parsed.organizer,
      parsed.tags,
    ]
  );

  return result.rows[0];
}

export async function getAllEvents(): Promise<Event[]> {
  const result = await pool.query(`SELECT * FROM events ORDER BY date ASC`);
  return result.rows;
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  const result = await pool.query(`SELECT * FROM events WHERE slug = $1`, [slug]);
  return result.rows[0] ?? null;
}

export async function getEventById(id: number): Promise<Event | null> {
  const result = await pool.query(`SELECT * FROM events WHERE id = $1`, [id]);
  return result.rows[0] ?? null;
}