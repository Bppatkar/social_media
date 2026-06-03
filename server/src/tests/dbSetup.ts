import mongoose from 'mongoose';

beforeAll(async () => {
  if (mongoose.connection.readyState === 1) return;

  await mongoose.connect(process.env.MONGO_URI_TEST as string, {
    serverSelectionTimeoutMS: 5000,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});