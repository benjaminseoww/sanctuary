import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config()

const apiUrl = process.env.EXPO_PUBLIC_API_URL 
const baseUrl = apiUrl + '/api/bookmarks';

async function getBookmarks(user_id : number) {
    const request = axios.get(baseUrl, {
        params: {
            user_id: user_id
        }  
    })
    return request.then(response => response.data)
} 

async function getBookmarkInfo(bookmark_id : number, user_id : number) {
    const request = axios.get(baseUrl + '/' + bookmark_id, {
        params: {
            user_id: user_id
        }  
    })  
    return request.then(response => response.data)
}

async function createBookmark(user_id : number, url : string) {
    const request = axios.post(baseUrl, {
        user_id: user_id,
        url: url
    })  
    return request.then(response => response.data)
}

async function deleteBookmark(bookmark_id : number, user_id : number) {
    const request = axios.delete(baseUrl + '/' + bookmark_id, {
        params: {
            user_id: user_id
        }
    })
    return request.then(response => response.data)
}


export default {
    getBookmarks,
    getBookmarkInfo,
    createBookmark,
    deleteBookmark
}

// testing
console.log(deleteBookmark(15, 1).then(data => console.log(data)))