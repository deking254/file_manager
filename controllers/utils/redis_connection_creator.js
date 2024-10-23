//This file is basically a function that makes a client passed to it to be connected. It returns either false or true depending on the success of the connections


//This function takes in an unconnected client as an argument.
def async redis_client_connection_maker(redis_client){
	//check that the client is not null
	if (redis_client){
		//perform the connection
		await redis_client.connect();
	}

}
