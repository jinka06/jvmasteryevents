'use server'

import {creationBooking} from "@/db/booking.model"

export const createBooking = async ({eventId, email}: {eventId: number, email: string}) => {
    try{
        const booking = await creationBooking({eventId, email})

        return {success: true, booking}
    } catch(error){
        console.error('Create booking failed', error)
        return { success: false, error: error instanceof Error ? error.message : "unknown"}
    }
}