import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.DB_URI);

    console.log(`MongoDb Connected with ${connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
