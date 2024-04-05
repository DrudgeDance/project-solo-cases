import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import errorHandler from '../auth/handlers/errorHandler.js';

const { Schema, model } = mongoose;
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
  username: { type: String },
  password: { type: String, required: true },
  uniqueComboHash: {
    type: String,
    unique: true
  },
  roles: {
    type: [String],
    required: true,
    default: ['user']
  },
  email: { type: String },
  lastUpdated: {
    type: Map,
    of: Date,
    default: () => new Map([['createdAt', new Date()]])
  },
  oauthProviders: { type: Object }
}, { 
  timestamps: true,
  toObject: {
    transform: function (doc, ret, options) {
      ret._id = ret._id.toString(); // Ensure _id is a string
      return ret;
    }
  }
});

userSchema.virtual('cookieId').get(function() {
  return this._id.toString();
});

class UserClass {
  static async comparePasswords(candidatePassword, hashedPassword) {
    return bcrypt.compare(candidatePassword, hashedPassword);
  }
  
  static async createNewUser({ username, password }) {
    // Instead of generating the uniqueComboHash in the class method, 
    // you could move this logic into a middleware or keep it here based on preference.

    // Generate the uniqueComboHash
    const hashInput = `${username}${password}`;
    const uniqueComboHash = crypto.createHash('sha256').update(hashInput).digest('hex');
    
    // Check if a user with the same uniqueComboHash already exists
    const existingUser = await User.findOne({ uniqueComboHash });
    if (existingUser) {
      // User with the same hash exists, prevent creation and handle the situation
      throw new Error('User already exists');
    }

    // Hash the password before calling create
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      // Use create method to insert the document into the database
      const newUser = await User.create({
        username,
        password: hashedPassword, // Use the hashed password
        uniqueComboHash // Assign the generated uniqueComboHash to the new user
      });
      
      return newUser;
    } catch (error) {
      throw errorHandler.createErr({
        file: 'userModel.js',
        method: 'createNewUser',
        type: 'Problem creating a new user',
        error, // Include the error object in the thrown error
      });
    }
  }
}

// Apply the class to the schema and create the model
userSchema.loadClass(UserClass);
const User = model('User', userSchema);

export default User;
