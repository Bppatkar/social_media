import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI: string = process.env.MONGO_URI || '';
    await mongoose.connect(mongoURI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1); // Exit with failure
  }
};

export default connectDB;
