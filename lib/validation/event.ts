import { z } from "zod";

function normalizeDate(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) throw new Error("Invalid date format");
  return date.toISOString().split("T")[0];
}

function normalizeTime(timeString: string): string {
  const timeRegex = /^(\d{1,2}):(\d{2})(\s*(AM|PM))?$/i;
  const match = timeString.trim().match(timeRegex);
  if (!match) throw new Error("Invalid time format. Use HH:MM");

  let hours = parseInt(match[1]);
  const minutes = match[2];
  const period = match[4]?.toUpperCase();

  if (period) {
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
  }
  if (hours < 0 || hours > 23 || parseInt(minutes) < 0 || parseInt(minutes) > 59) {
    throw new Error("Invalid time values");
  }
  return `${hours.toString().padStart(2, "0")}:${minutes}`;
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export const eventModeEnum = z.enum(["online", "offline", "hybrid"], {
  error: "mode must be either online, offline, or hybrid",
});

export const eventInputSchema = z.object({
  title: z.string().trim().min(1, "Title required").max(100, "Title cannot exceed 100 characters"),
  description: z.string().trim().min(1, "Description required").max(1000, "Description cannot exceed 1000 characters"),
  overview: z.string().trim().min(1, "Overview required").max(500, "Overview cannot exceed 500 characters"),
  image: z.string().trim().min(1, "Image is required"),
  venue: z.string().trim().min(1, "Venue is required"),
  location: z.string().trim().min(1, "Location is required"),
  date: z.string().transform(normalizeDate),
  time: z.string().transform(normalizeTime),
  mode: eventModeEnum,
  audience: z.string().trim().min(1, "Audience is required"),
  agenda: z.array(z.string()).min(1, "At least one agenda item is required"),
  organizer: z.string().trim().min(1, "Organizer is required"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
});

export const eventSchema = eventInputSchema.extend({
  id: z.number(),
  slug: z.string().trim().toLowerCase(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type EventInput = z.infer<typeof eventInputSchema>;
export type Event = z.infer<typeof eventSchema>;