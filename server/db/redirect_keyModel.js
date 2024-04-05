import mongoose from 'mongoose';
import crypto from 'crypto';

const { Schema } = mongoose;

const redirectKeySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  encryptionKey: {
    type: String,
    required: true,
    default: () => crypto.randomBytes(32).toString('hex')
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 30 * 1000),
    index: { expires: 30 },
  },
  status: {
    type: String,
    enum: ['active', 'used'],
    default: 'active'
  }
}, {
  collection: 'redirect_key',
  timestamps: true
});

redirectKeySchema.index({ expiresAt: 1 }, { expireAfterSeconds: 30 });

const RedirectKeyModel = mongoose.model('RedirectKey', redirectKeySchema);

export default RedirectKeyModel;
