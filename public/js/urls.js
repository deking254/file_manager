//import { token } from './auth.js';
export const URLS = {
    API_PUBLIC_FOLDERS_GET: 'http://127.0.0.1:5000/public-folders',
    API_LOGIN_GET: 'http://127.0.0.1:5000/connect',
    PAGE_HOME: 'http://127.0.0.1:5000/',
    PAGE_ADD_FILE_FOLDER: 'http://127.0.0.1:5000/file-add',
    PAGE_FILE_LIST: 'http://127.0.0.1:5000/file-list',
    PAGE_LOGIN: 'http://127.0.0.1:5000/login',
    PAGE_REGISTER: 'http://127.0.0.1:5000/sign-up',
    API_STATUS_GET: 'http://127.0.0.1:5000/status',
    API_STATS_GET: 'http://127.0.0.1:5000/stats',
    API_USER_ADD_POST: 'http://127.0.0.1:5000/users',
    API_LOGOUT_GET: 'http://127.0.0.1:5000/disconnect',
    API_USER_PROFILE_GET: 'http://127.0.0.1:5000/users/me',
    API_ADD_FILE_FOLDER_POST: 'http://127.0.0.1:5000/files',
    API_FILE_GET: 'http://127.0.0.1:5000/files/:id',
    API_FILES_GET: 'http://127.0.0.1:5000/files',
    API_FILE_PUBLIC_PUT: 'http://127.0.0.1:5000/files/:id/publish',
    API_FILE_PRIVATE_PUT: 'http://127.0.0.1:5000/files/:id/unpublish',
    API_READ_FILE_GET: 'http://127.0.0.1:5000/files/:id/data'
}

export const ERRORS = {
    INVALID_NET_RESPONSE: 'Network response was not ok ',
    FETCH_ERROR: 'There was a problem with the fetch operation:',
    TOKEN_UNAVAILABLE: 'Token not found in session storage.'
}
// export const REQUEST_CONFIGURATIONS = {
//     LOGIN: {
//         method: 'GET',
//         headers: {
//             'Authorization': `Basic ${auth}`
//         }
//     }
// }

export const STRINGS = {
    TOKEN_KEY: 'authToken',
}