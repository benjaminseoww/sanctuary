import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL as string
const supabaseKey = process.env.NODE_ENV == 'dev' ? process.env.SUPABASE_ADMIN_KEY as string : process.env.SUPABASE_API_KEY as string

export {
    supabaseUrl,
    supabaseKey
}