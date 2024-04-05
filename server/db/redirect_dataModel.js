import mongoose from 'mongoose';

const { Schema } = mongoose;

const redirectDataSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  encryptedData: {
    type: String,
    required: true
  },
  iv: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'used'],
    default: 'active'
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 30 * 1000), // sets the default expiration time to 30 seconds from document creation
  }
}, {
  collection: 'redirect_data',
  timestamps: true
});

// Set TTL index on expiresAt field for 30 seconds
redirectDataSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 30 });

const RedirectDataModel = mongoose.model('RedirectData', redirectDataSchema);

export default RedirectDataModel;
