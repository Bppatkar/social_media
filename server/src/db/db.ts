import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI =
      process.env.MONGO_URI ||
      'mongodb+srv://bpp777:bppSocialMedia@cluster0.gvdicy9.mongodb.net/social_media';
    await mongoose.connect(mongoURI);
    console.log('MongoDB Connected');
    
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1); // Exit with failure
  }
};

export default connectDB;
