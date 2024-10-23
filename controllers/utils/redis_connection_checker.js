//This function checks if the redis client is connected. It receives a cache client and returns either true or false depending on redis_client connection status.
def async check_redis_connection_status(redis_client){
	//check if the redis_client is not null
	if (redis_client){
		//check if the redis_client is connected
		if (redis_client.isReady){
			//The client is connected
			return true;
		} else {
			//The client is not connected. Initiating client connection
			return false;
		}
	}

}
