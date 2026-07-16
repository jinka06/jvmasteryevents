import Image from "next/image"
import {notFound} from "next/navigation"
import BookEvent from "@/components/BookEvent"
import {getSimilarEventBySlug} from '@/lib/actions/event.actions'
import EventCard from '@/components/EventCard'
import type {Event} from '@/lib/validation/event'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const EventDetailItem = ({icon, alt, label}: {icon: string, alt: string, label:string}) => (
    <div className="flex-row-gap-2 items-center">
        <Image src={icon} alt={alt} width={17} height={17} />
        <p>{label}</p>
    </div>
)

const EventAgenda = ({agendaItems}:{agendaItems: string[]})=>(
    <div className="agenda">
        <h2>Agenda</h2>
        <ul>
            {agendaItems.map((item)=>(
                <li key={item}>{item}</li>
            ))}
        </ul>
    </div>
)

const EventTags = ({tagsItems}:{tagsItems: string[]}) => (
    <div className="flex flex-row gap-1.5 flex-wrap">
        {tagsItems.map((tag)=>(
                <div className="pill" key={tag}>{tag}</div>
            ))}
    </div>
)

const EventDetailsPage = async ({params}: {params: Promise<{slug: string}>}) => {
  const {slug} = await params
  const request = await fetch(`${BASE_URL}/api/events/${slug}`)
  const {event: {description, image, overview, date, time, location, mode, agenda, organizer, audience, tags}} = await request.json()

  if(!description) return notFound()

    const bookings = 10

    const similarEvents: Event[] = await getSimilarEventBySlug(slug)

    return (
    <section id='event'>
        <div className="header">
            <h1>Event Description</h1>
            <p>{description}</p>
        </div>
        <div className="details">
            {/* Left Side - Event Content */}
            <div className="content">
                <Image src={image} alt="Event Banner" height={800} width={800} className="banner"/>
                <section className="flex-col-gap-2">
                    <h2>Overview</h2>
                    <p>{overview}</p>
                </section>
                <section className="flex-col-gap-2">
                    <h2>Event Details</h2>
                    <EventDetailItem icon="/icons/calendar.svg" alt="calendar" label={date} />
                    <EventDetailItem icon="/icons/clock.svg" alt="clock" label={time} />
                    <EventDetailItem icon="/icons/pin.svg" alt="pin" label={location} />
                    <EventDetailItem icon="/icons/mode.svg" alt="mode" label={mode} />
                    <EventDetailItem icon="/icons/audience.svg" alt="audience" label={audience} />
                </section>

                <EventAgenda agendaItems={agenda} />

                <section className="flex-col-gap-2">
                    <h2>About the Organizer</h2>
                    <p>{organizer}</p>
                </section>

                <EventTags tagsItems={tags} />
            </div>
            
            {/* Right Side - Booking Content */}
            <aside className="booking">
                <div className="signup-card">
                    <h2>Book Your Spot</h2>
                    {bookings >0  ? (
                        <p className="text-sm">
                            Join {bookings} people who have already booked their spot!
                        </p>
                    ): (
                        <p className="text-sm">Be the first to book your spot</p>
                    )}
                    <BookEvent />
                </div>
            </aside>
        </div>

        <div className="flex w-full flex-col gap-4 pt-20">
            <h2>Similar Events</h2>
            <div className="events">{similarEvents.length > 0 && similarEvents.map((similarEvent: Event)=>(
                <EventCard
                    key={similarEvent.id}
                    title={similarEvent.title}
                    image={similarEvent.image}
                    slug={similarEvent.slug}
                    location={similarEvent.location}
                    date={(similarEvent.date as unknown) instanceof Date 
        ? (similarEvent.date as unknown as Date).toISOString().split("T")[0] 
        : similarEvent.date}
                    time={similarEvent.time}
                />
            ))}</div>
        </div>
    </section>
  )
}

export default EventDetailsPage