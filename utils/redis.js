const { createClient } = require('redis');

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (error) => {
      console.log(error);
    });
  }

  async get(key) {
    let result;
    //await this.client.connect();
    result = await new Promise((resolve) => {
      this.client.get(key, (error, response) => {
        if (!error) {
          resolve(response);
        } else {
          console.log(error); 
        }
      });
    });
    return result;
  }

  async set(key, value, duration) {
    await this.client.set(key, value, 'EX', duration);
  }

  async del(key) {
    if (this.isAlive()) {
      this.client.del(key);
    }
  }
  async connectClient() {
    if (this.client.isReady) {
      console.log("The client is already connected");
    } else {
      await this.client.connect();
    }
  }
}
const redisClient = new RedisClient();
module.exports = redisClient;
