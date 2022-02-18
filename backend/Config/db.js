import mongoose from "mongoose";

const connectDB = async () => {
  try {
    //console.log("process.env.MONGO_URI:", process.env.MONGO_URI);
    //let uri = process.env.MONGO_URI;
    //let tempUri = process.env.REACT_APP_MONGO_URI;
    //console.log("process.env.MONGO_URI: ", process.env.MONGO_URI);
    //consolole.log(typeof process.env.MONGO_URI);
    // console.log(
    //   "process.env.REACT_APP_MONGO_URI: ",
    //   process.env.REACT_APP_MONGO_URI
    // );
    //console.log(typeof process.env.REACT_APP_MONGO_URI);
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
