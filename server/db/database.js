import mongoose from 'mongoose';

const mongoUri = 'mongodb://localhost:27017/soloProject';

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('MongoDB disconnected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
