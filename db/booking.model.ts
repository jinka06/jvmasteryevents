import pool from "@/db/client";
import { bookingInputSchema, type Booking } from "@/lib/validation/booking";
import { getEventById } from "@/db/event.model";

export async function creationBooking(data: unknown): Promise<Booking> {
  const parsed = bookingInputSchema.parse(data);

  const event = await getEventById(parsed.eventId);
  if (!event) {
    throw new Error(`Event with ID ${parsed.eventId} does not exist`);
  }

  const result = await pool.query(
    `INSERT INTO bookings (event_id, email)
     VALUES ($1, $2)
     RETURNING *`,
    [parsed.eventId, parsed.email]
  );

  return result.rows[0];
}

export async function getBookingsByEvent(eventId: number): Promise<Booking[]> {
  const result = await pool.query(
    `SELECT * FROM bookings WHERE event_id = $1 ORDER BY created_at DESC`,
    [eventId]
  );
  return result.rows;
}

export async function getBookingsByEmail(email: string): Promise<Booking[]> {
  const result = await pool.query(`SELECT * FROM bookings WHERE email = $1`, [email]);
  return result.rows;
}