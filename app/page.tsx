import React from 'react'
import ExploreBtn from '../components/ExploreBtn'
import EventCard from '../components/EventCard'
import events from '../lib/constants'
import {Event} from '../lib/validation/event'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const Page = async () => {
    const response = await fetch(`${BASE_URL}/api/events`)
    const {events} = await response.json()
  
    return (
    <section>
        <h1 className="text-center">The Hub for every dev <br /> event you can't miss</h1>
        <p className="text-center mt-5">Hackatons, Meetups,and Conferences, all in one place!</p>
        <ExploreBtn />
        <div className="mt-20 space-y-7">
            <h3>Featured Events</h3>
            <ul className="events">
                {events && events.length > 0 && events.map((event: Event) => (
                    <li key={event.title}>
                        <EventCard {...event}/>
                    </li>
                ))}
            </ul>
        </div>
    </section>
  )
}

export default Page