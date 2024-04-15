import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const dbUri = process.env.mongo_uri
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`MongoDB connected to ${dbUri}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`);
    process.exit(1);
  }
};

export default connectDB;