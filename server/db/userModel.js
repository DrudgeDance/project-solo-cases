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
  // Inside the userSchema definition in userModel.js
  oauthProviders: {
    type: Map,
    of: String,
    default: () => new Map() // This now can store GitHub ids or tokens
  },

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
  
  static async createNewUser(
    { 
      username, 
      password = crypto.randomBytes(16).toString('hex'), 
      email = '', 
      oauthProviders = {}, 
      profileImageUrl = '' 
    }) {
    // Generate the uniqueComboHash
    const hashInput = `${username}${password}`;
    const uniqueComboHash = crypto.createHash('sha256').update(hashInput).digest('hex');
    
    // Check if a user with the same uniqueComboHash already exists
    const existingUser = await this.findOne({ uniqueComboHash });
    if (existingUser) {
      throw new Error('User already exists');
    }
  
    // Hash the password
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    // Convert oauthProviders object to a Map, handling the case where it's not provided
    const oauthProvidersMap = new Map(Object.entries(oauthProviders));
  
    try {
      // Use create method to insert the document into the database
      const newUser = await this.create({
        username,
        password: hashedPassword,
        email,
        uniqueComboHash,
        oauthProviders: oauthProvidersMap,
        profileImageUrl,
      });
      
      return newUser;
    } catch (error) {
      throw new Error('Problem creating a new user');
    }
  }
}

// Apply the class to the schema and create the model
userSchema.loadClass(UserClass);
const User = model('User', userSchema);

export default User;
