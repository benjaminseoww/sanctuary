import express from 'express'
import { Request, Response } from 'express'

import { createClient } from '@supabase/supabase-js'
import { supabaseUrl, supabaseKey } from '@/utils/config'

const supabase = createClient(supabaseUrl, supabaseKey)

const collectionsRouter = express.Router()

// GET /collections: Get all collections
collectionsRouter.get('/', async (req: Request, res: Response) => {
    // Request: params: { user_id: int, prev_cursor: string } 
    // get all collections for the user
    const user_id = req.query.user_id
    const prev_cursor = req.query.prev_cursor === undefined || 
                        req.query.prev_cursor === '' || 
                        req.query.prev_cursor === 'null' 
                        ? null 
                        : req.query.prev_cursor;

    // TODO: authenticate the user


    // if prev_cursor is provided, get the collections after the next_cursor
    // if limit is provided, get the collections up to the limit

    const { data, error } = await supabase.rpc('get_collections_chrono_order', {
        p_user_id: user_id,
        p_prev_cursor: prev_cursor,
    })

    if (error) {
        return res.status(400).json({error: error.message, details: error.details})
    }
    
    // Response: {collections: [collections], next_cursor: string, the next cursor }
    return res.status(200).json(data)
})

// POST /collections : Create a new collection for user
collectionsRouter.post('/', async (req: Request, res: Response) => {
    // Request: { user_id: int, name: string }
    
    // create a collection in the back end and return the collection id
    const { data, error } = await supabase
        .from('Collections')
        .insert({user_id: req.body.user_id, name: req.body.name})
        .select("collection_id, name")

    if (error) {
        return res.status(400).json({error: error.message})
    }
    // add to database and return the collection id
    return res.status(201).json(data)   
})

// delete a collection
collectionsRouter.delete('/:collection_id', async (req: Request, res: Response) => {
    // Request: url query { user_id: int }
    const collection_id = req.params.collection_id
    const user_id = req.query.user_id

    // TODO: check if both collection and bookmark belong to user

    const { data, error } = await supabase
        .from('Collections')
        .delete()
        .match({collection_id: collection_id, user_id: user_id})

    if (error) {
        return res.status(400).json({error: error.message})
    }

    return res.status(201).json(data)
})

//`GET /collections/:collection_id/bookmarks` : Get all the bookmark in a user’s collection
collectionsRouter.get('/:collection_id/bookmarks', async (req: Request, res: Response) => {
    // Request: url query values { user_id: int, prev_cursor: string } 
    const collection_id = req.params.collection_id

    const user_id = req.query.user_id
    const prev_cursor = req.query.prev_cursor === undefined || 
                        req.query.prev_cursor === '' || 
                        req.query.prev_cursor === 'null' 
                        ? null 
                        : req.query.prev_cursor;

    // TODO: authenticate the user

    // use limit and cursor to paginate, to get the bookmarks as user scrolls
    /* 
    Steps:
    1. check if collection belongs to user, if not return 400
    2. get the bookmarks in the collection
    3. return the bookmarks, 
        no bookmarks = (empty array)
        if a next cursor (if there is more)
     */
    const { data, error } = await supabase.rpc('get_bookmarks_in_collection_chrono_order', {
        p_user_id: user_id,
        p_prev_cursor: prev_cursor || null,
        p_collection_id: collection_id,
    })

    if (error) {
        return res.status(400).json({error: error.message, details: error.details})
    }
    
    // Response: {bookmarks: [bookmarks], next_cursor: string, the next cursor, collection_id: int }
    return res.status(200).json(data)
})

// POST /collections/:collection_id/bookmarks` : add a bookmark into a collection
collectionsRouter.post('/:collection_id/bookmarks', async (req: Request, res: Response) => {
    // Request: { user_id: int, bookmark_id: int }
    const collection_id = req.params.collection_id

    // TODO: checking if bookmark and collection both belong to user

    // add a bookmark to a collection
    // add to bookmarkcollections table and return the bookmarkcollection_id
    const { data, error } = await supabase
        .from('BookmarkCollections')
        .insert({collection_id: collection_id, bookmark_id: req.body.bookmark_id})
        .select("bookmarkcollection_id, bookmark_id, collection_id")

    if (error) {
        return res.status(400).json({error: error.message})
    }
    
    return res.status(201).json(data)
})

// `DELETE /collections/:collection_id/bookmarks/:bookmark_id` : remove a bookmark from a collection
collectionsRouter.delete('/:collection_id/bookmarks/:bookmark_id', async (req: Request, res: Response) => {
    // delete a row in bookmarkcollections table
    // Request: { user_id: int }
    const collection_id = req.params.collection_id
    const bookmark_id = req.params.bookmark_id

    // TODO: check if both collection and bookmark belong to user

    const { data, error } = await supabase
        .from('BookmarkCollections')
        .delete()
        .match({collection_id: collection_id, bookmark_id: bookmark_id})

    if (error) {
        return res.status(400).json({error: error.message})
    }

    return res.status(201).json(data)
})

export default collectionsRouter