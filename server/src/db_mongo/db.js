import mongoose from 'mongoose';

const database = {

  async connectDB() {
    try {
      await mongoose.connect('mongodb://localhost/courtData');
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Connection error:', error.message);
    }
  },

  async closeDB() {
    try {
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB');
    } catch (error) {
      console.error('Disconnection error:', error.message);
    }
  }

};

export default database;