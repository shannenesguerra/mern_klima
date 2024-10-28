import mongoose from "mongoose"
import dotenv from "dotenv";

dotenv.config();
// Function to connect to MongoDb
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'klima',
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); 
  }
}

