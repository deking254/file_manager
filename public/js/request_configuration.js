import { authorization } from "./login";

export const REQUEST_CONFIGURATION = {
    LOGIN: {
        method: 'GET',
        headers: {
            'Authorization': authorization()
        }
    }
}