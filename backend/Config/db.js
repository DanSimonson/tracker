import mongoose from "mongoose";

//process.env.MONGO_URI
//mongodb+srv://dan123:dan123@resfulapi.7d1qe.mongodb.net/tracker?retryWrites=true&w=majority
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb+srv://dan123:dan123@resfulapi.7d1qe.mongodb.net/tracker?retryWrites=true&w=majority",
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        //useCreateIndex: true,
      }
    );
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Mongo connect error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
