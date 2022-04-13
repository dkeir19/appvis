import mongoose from "mongoose";
import dotenv from "dotenv";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`Mongo db connected : ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error2 ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
