'use client'

import {useState} from "react"
import {createBooking} from "@/lib/actions/booking.actions"

const BookEvent = ({eventId, slug}:{eventId: string, slug: string}) => {
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e:React.FormEvent)=>{
        e.preventDefault()
        setError(null)
        
        const {success, error} = await createBooking({eventId, email})

        if(success){
            setSubmitted(true)
        } else{
            setError(typeof error === "string" ? error : "Booking failed. Please try again.")
        }

    }

    return (
    <div id="book-event">
        {submitted ? (
            <p className="text-sm">Thank you for signing up!</p>
        ): (
            <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="Enter your email address"
              required
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button type="submit" className="button-submit">Submit</button>
        </form>
        )}
    </div>
  )
}

export default BookEvent