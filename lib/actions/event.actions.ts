'use server'

import { revalidatePath } from 'next/cache'
import { createEvent, getEventBySlug } from '@/db/event.model'
import pool from "@/db/client";

export const getSimilarEventBySlug = async (slug: string) => {
  try {
    const event = await getEventBySlug(slug)

    if (!event) {
      throw new Error(`Event with slug "${slug}" not found`)
    }
    const result = await pool.query(
      `SELECT * FROM events
      WHERE id != $1
      AND tags && $2
      LIMIT 4`, [event.id, event.tags]
    )
    return result.rows
  } catch {
    return []
  }
}

export const createEventAction = async (formValues: {
  title: string
  description: string
  overview: string
  image: string
  venue: string
  location: string
  date: string
  time: string
  mode: string
  audience: string
  agenda: string[]
  organizer: string
  tags: string[]
}) => {
  try {
    const event = await createEvent(formValues)
    revalidatePath('/')
    return { success: true as const, event }
  } catch (error) {
    console.error('Create event failed', error)
    return { success: false as const, error: error instanceof Error ? error.message : 'unknown' }
  }
}