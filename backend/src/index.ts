import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'

const { createClient } = require('@supabase/supabase-js')

dotenv.config()

const app: Express = express()
const PORT = 3001

const supabaseUrl = process.env.SUPABASE_URL as string
const supabaseKey = process.env.SUPABASE_KEY as string
const supabase = createClient(supabaseUrl, supabaseKey)

app.get('/', (req : Request, res : Response) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`This is the sample backend`)
})