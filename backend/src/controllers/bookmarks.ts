import express from 'express'
import { Request, Response } from 'express'

import { createClient } from '@supabase/supabase-js'
import { supabaseUrl, supabaseKey } from '../utils/config'

import extract from '../scripts/detailExtractor'

const supabase = createClient(supabaseUrl, supabaseKey)

const bookmarksRouter = express.Router()

// GET /bookmarks: Get all bookmarks by a user, in descending order of creation
bookmarksRouter.get('/', async (req: Request, res: Response) => {
    // request: url query {user_id: string}

    const user_id = req.query.user_id

    // TODO: cursor pagination
    const { data, status, error } = await supabase
        .from('Bookmarks')
        .select('*')
        .eq('user_id', user_id)
        .order('created_at', {ascending: false})

    if (error) {
        res.status(status).json({ error: error.message })
    }

    return res.status(200).json(data)
    
})

// GET /bookmarks/:bookmark_id: Get a bookmark by id
bookmarksRouter.get('/:bookmark_id', async (req: Request, res: Response) => {
    // request: url query {user_id: string}

    const user_id = req.query.user_id
    const bookmark_id = req.params.bookmark_id

    const { data, status, error } = await supabase
        .from('Bookmarks')
        .select()
        .match({user_id: user_id, bookmark_id: bookmark_id})

    if (error) {
        res.status(status).json({ error: error.message })
    }

    return res.status(status).json(data)
    
})

// POST /bookmarks: Create a new bookmark
bookmarksRouter.post('/', async (req: Request, res: Response) => {
    // request: {user_id: int, url: string}

    // check for the document type it is 

    // TODO: check if the document already exists in the database, using document type

    // TODO: output out logs to the console
    // TODO: to use cloudflare workers instead
    const document_meta_data = await extract(req.body.url)

    // add into documents table
    const { data: addDocData, status: addDocStatus, error: addDocError } = await supabase
        .from('Documents')
        .insert({
            url: req.body.url,
            title: document_meta_data.title,
            caption: document_meta_data.caption,
            thumbnail_url: document_meta_data.thumbnail_url,
            creator_name: document_meta_data.creator_name,
            creator_username: document_meta_data.creator_username,
            external_id: document_meta_data.external_id,
            doctype_id: document_meta_data.document_type
        })
        .select("document_id") 

    if (addDocError) {
        return res.status(addDocStatus).json({ error: addDocError.message, message: "Error adding document into database"})
    }

    if (!addDocStatus || addDocData.length === 0) {
        return res.status(addDocStatus).json({ error: "Error adding document into database"})
    }

    const { data, status, error } = await supabase
        .from('Bookmarks')
        .insert({user_id: req.body.user_id, document_id: addDocData[0].document_id})
        .select()

    if (error) {
        res.status(status).json({ error: error.message, message: "Error adding bookmark into database" })
    }

    return res.status(status).json(data)
})

// DELETE /bookmarks/:bookmark_id: Delete a bookmark by ids
bookmarksRouter.delete('/:bookmark_id', async (req: Request, res: Response) => {
    // request: {user_id: string}
    const user_id = req.query.user_id
    const bookmark_id = req.params.bookmark_id

    const { data, error } = await supabase
        .from('Bookmarks')
        .delete()
        .match({user_id: user_id, bookmark_id: bookmark_id})

    if (error) {
        res.status(400).json({ error: error.message })
    }

    return res.status(200).json(data)
    
})


export default bookmarksRouter