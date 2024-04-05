//  FILENAME:  db_scraper&poller.js

import mongoose from 'mongoose';
import crypto from 'crypto';

class DB {
  constructor() {
    this.connection = null;
  }

  async open(mongoUri) {
    if (this.connection) {
      return;
    }
    try {
      await mongoose.connect(mongoUri);
      this.connection = mongoose.connection;
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Could not connect to MongoDB:', error);
      throw error;
    }
  }

  async close() {
    if (!this.connection) {
      console.log('No MongoDB connection to close');
      return;
    }
    try {
      await mongoose.disconnect();
      this.connection = null;
      console.log('Disconnected from MongoDB');
    } catch (error) {
      console.error('Error disconnecting from MongoDB:', error);
      throw error;
    }
  }

  createModel( name ) {
    const schema = new mongoose.Schema({
      data: String,
      timestamp: { type: Date, default: Date.now },
      hash: { type: String, default: '' },
      url: { type: String, default: '' },
    });

    schema.pre('save', function(next) {
      this.hash = crypto.createHash('sha256').update(`${this.data}${this.url}`).digest('hex');
      next();
    });

    schema.statics.checkAndSaveDocument = async function(document) {
      const hash = crypto.createHash('sha256').update(`${document.data}${document.url}`).digest('hex');
      const existingDoc = await this.findOne({ hash });
      if ( existingDoc ) {
        console.log('Collision detected.');
        return null;
      } else {
        document.hash = hash;
        return this.create(document);
      }
    };

    return mongoose.models[name] || mongoose.model(name, schema, name);
  }
}

// Exporting an instance to ensure a single shared connection
export const db = new DB();