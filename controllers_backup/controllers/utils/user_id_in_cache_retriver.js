

//This function uses the token to find the userid associated with token
def async get_userid_from_token(token){
    if (token) {
        console.log('Starting the processing of the provided token.');
        console.log('Checking cache client readiness');
    if (cache.client.isReady){
        console.log('The cache client is ready.');
        userIdInCache = await cache.client.get(`auth_${token}`);
        console.log(`The query operation on the cache returned ${userIdInCache}`);
    } else {
        console.log('Firing up the cache client.');
        await cache.client.connect();
        if (cache.client.isReady){
            console.log('The cache client is ready.');
            userIdInCache = await cache.client.get(`auth_${token}`);
            console.log(`The query operation on the cache returned ${userIdInCache}`);
        } else {
            console.log("Despite efforts to reconnect to the client, we were unable to. Please restart the redis service using sudo systemctl restart redis");
        }
    }
}
