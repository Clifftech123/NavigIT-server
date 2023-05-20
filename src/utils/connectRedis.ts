import { createClient } from 'redis';

// Redis URL
const redisUrl = 'redis://localhost:6379';

//  Create Redis Client
const redisClient = createClient({
  url: redisUrl,
});


//  Connect to Redis  
const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log('Redis client connected successfully');
    redisClient.set('try', 'Hello Welcome to student connect platform');
  } catch (error) {
    console.log(error);
    setTimeout(connectRedis, 5000);
  }
};

//   calling  Connect to Redis  function 
connectRedis();

export default redisClient;

