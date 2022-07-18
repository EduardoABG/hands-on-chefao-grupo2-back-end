import "dotenv/config";

const ENV = {
  MONGO_URL: process.env.MONGO_URL as string,
};

export default ENV;
