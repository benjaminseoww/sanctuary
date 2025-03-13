import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config()

const apiUrl = process.env.EXPO_PUBLIC_API_URL 
const baseUrl = apiUrl + '/api/collections';

// get all collections of a user
async function getCollections(user_id : number, prev_cursor : string | null = null) {
    const request = axios.get(baseUrl, {
        params: {
            user_id: user_id,
            prev_cursor: prev_cursor
        }  
    })
    return request.then(response => response.data)
}

// create a new collection
async function createCollection(user_id : number, name : string) {
    const request = axios.post(baseUrl, {
        user_id: user_id,
        name: name
    })
    return request.then(response => response.data)
}

// delete a collection
async function deleteCollection(collection_id : number, user_id : number) {
    const request = axios.delete(baseUrl + '/' + collection_id, {
        params: {
            user_id: user_id
        }
    })
    return request.then(response => response.data)
}

async function addBookmarkToCollection(user_id: number, collection_id: number, bookmark_id: number) {
    const request = axios.post(baseUrl + '/' + collection_id + '/bookmarks', {
        user_id: user_id,
        bookmark_id: bookmark_id
    })
    return request.then(response => response.data)
}

async function removeBookmarkFromCollection(user_id: number, collection_id: number, bookmark_id: number) {
    const request = axios.delete(baseUrl + '/' + collection_id + '/bookmarks/' + bookmark_id, {
        params: {
            user_id: user_id
        }
    })
    return request.then(response => response.data)
}

async function getBookmarksOfCollection(user_id : number, prev_cursor : string | null = null, collection_id: number) {
    const request = axios.get(baseUrl + '/' + collection_id + '/bookmarks', {
        params: {
            user_id: user_id,
            prev_cursor: prev_cursor
        }  
    })
    return request.then(response => response.data)
}

export default {
    getCollections,
    createCollection,
    deleteCollection,
    addBookmarkToCollection,
    removeBookmarkFromCollection,
    getBookmarksOfCollection   
}

// testing
console.log(deleteCollection(19, 1).then(data => console.log(data)))