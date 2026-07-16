'use server'

import {getEventBySlug} from '../../db/event.model'
import pool from "@/db/client";

export const getSimilarEventBySlug = async (slug:string)=>{
    try{
        const event = await getEventBySlug(slug)

        if(!event){
            throw new Error(`Event with slug "${slug} not found`)
        }
        const result = await pool.query(
            `SELECT * FROM events
            WHERE id != $1
            AND tags && $2
            LIMIT 4`,[event.id, event.tags]
        )
        return result.rows
    } catch {
        return []
    }
}