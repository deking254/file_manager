//This class deals with controller specific operations on the redis cache.
const cache = require('../../utils/redis');
const messages = require('./constants');
class Cache_operations {
    constructor() {

    }
    //This function retrieves a userid in the cache(provded) that is associated with the token(provided)
    async get_userid_from_token(token) {
        let userIdInCache = null;
        await cache.connectClient();
        if (cache.client.isReady) {
            userIdInCache = await cache.client.get(`auth_${token}`);
        } else {
            throw new Error(messages.ERROR_MESSAGES.CACHE_ERROR);
        }
        return userIdInCache;
    }
    //checks that the token provided is associated with the user and if so it returns the userid
    async verify_token(token) {
        let userId = await this.get_userid_from_token(token);
        if (userId) {
            return userId;
        } else {
            throw new Error(messages.ERROR_MESSAGES.UNAUTHORIZED);
        }
    }
}

module.exports = new Cache_operations();