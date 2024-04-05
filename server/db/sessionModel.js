import mongoose from 'mongoose';

const { Schema } = mongoose;

const sessionSchema = new Schema({
  cookieId: { type: String, required: true, unique: true },
  csrfToken: { type: String, required: true },
  csrfExpires: { type: Date, required: true },
  createdAt: { type: Date, expires: 30, default: Date.now }
});

export default mongoose.model('Session', sessionSchema);