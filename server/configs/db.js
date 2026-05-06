import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "ApnaCircle",
    });

    isConnected = true;
    console.log("Database Connected");

    return conn;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export default connectDB;