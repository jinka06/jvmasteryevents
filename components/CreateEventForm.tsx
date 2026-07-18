'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createEventAction } from '@/lib/actions/event.actions'

const MODES = ['online', 'offline', 'hybrid'] as const

const CreateEventForm = () => {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    const form = new FormData(e.currentTarget)

    const agenda = (form.get('agenda') as string)
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)

    const tags = (form.get('tags') as string)
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)

    const payload = {
      title: form.get('title') as string,
      description: form.get('description') as string,
      overview: form.get('overview') as string,
      image: form.get('image') as string,
      venue: form.get('venue') as string,
      location: form.get('location') as string,
      date: form.get('date') as string,
      time: form.get('time') as string,
      mode: form.get('mode') as string,
      audience: form.get('audience') as string,
      organizer: form.get('organizer') as string,
      agenda,
      tags,
    }

    const result = await createEventAction(payload)
    setSubmitting(false)

    if (result.success) {
      router.push(`/events/${result.event.slug}`)
    } else {
      setError(result.error ?? 'Something went wrong. Please check your inputs.')
    }
  }

  return (
    <form id="create-event-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required maxLength={100} />
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" required maxLength={1000} rows={4} />
      </div>

      <div>
        <label htmlFor="overview">Overview</label>
        <textarea id="overview" name="overview" required maxLength={500} rows={3} />
      </div>

      <div>
        <label htmlFor="image">Image path or URL</label>
        <input type="text" id="image" name="image" required placeholder="/images/event9.png or https://..." />
      </div>

      <div>
        <label htmlFor="venue">Venue</label>
        <input type="text" id="venue" name="venue" required />
      </div>

      <div>
        <label htmlFor="location">Location</label>
        <input type="text" id="location" name="location" required />
      </div>

      <div>
        <label htmlFor="date">Date</label>
        <input type="date" id="date" name="date" required />
      </div>

      <div>
        <label htmlFor="time">Time</label>
        <input type="time" id="time" name="time" required />
      </div>

      <div>
        <label htmlFor="mode">Mode</label>
        <select id="mode" name="mode" required defaultValue="">
          <option value="" disabled>Select a mode</option>
          {MODES.map((mode) => (
            <option key={mode} value={mode}>{mode}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="audience">Audience</label>
        <input type="text" id="audience" name="audience" required />
      </div>

      <div>
        <label htmlFor="agenda">Agenda (one item per line)</label>
        <textarea id="agenda" name="agenda" required rows={6} placeholder={"09:00 - Registration\n09:30 - Opening keynote"} />
      </div>

      <div>
        <label htmlFor="organizer">Organizer</label>
        <input type="text" id="organizer" name="organizer" required />
      </div>

      <div>
        <label htmlFor="tags">Tags (one per line)</label>
        <textarea id="tags" name="tags" required rows={3} placeholder={"react\nfrontend"} />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button type="submit" disabled={submitting} className="button-submit">
        {submitting ? 'Creating...' : 'Create Event'}
      </button>
    </form>
  )
}

export default CreateEventForm