import { z } from "zod";

const emailRegex = /^[a-zA-Z0-9.!#$%'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const bookingInputSchema = z.object({
  eventId: z.number({ error: "Event ID is required" }),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .refine((val) => emailRegex.test(val), { message: "Invalid email format" }),
});

export const bookingSchema = bookingInputSchema.extend({
  id: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type BookingInput = z.infer<typeof bookingInputSchema>;
export type Booking = z.infer<typeof bookingSchema>;