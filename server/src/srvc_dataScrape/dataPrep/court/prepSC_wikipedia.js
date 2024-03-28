import mongoose from 'mongoose';
import { generateDocumentHash } from './documentHashUtility.js';

const createOpinionSchema = () => {
  const opinionSchema = new mongoose.Schema({
    date: Date,
    docketNo: {
      fiscalYear: String,
      sequenceNo: String,
    },
    parties: {
      petitioner: String,
      respondent: String,
    },
    url: {
      baseUrl: String,
      path: String,
      fileName: String,
    },
    justice: String,
    citation: String,
    decisionSummary: String, 
    _docHash: String,
  });

  opinionSchema.index({ 'docketNo.fiscalYear': 1, 'docketNo.sequenceNo': 1 }, { unique: true });

  opinionSchema.pre('save', function(next) {
    this._docHash = generateDocumentHash(this);
    next();
  });

  return opinionSchema;
};

const createScOpinionModel = (opinionSchema) => {
  return mongoose.model('ScOpinion', opinionSchema);
};

const db = {
  async connect(databaseName) {
    try {
      await mongoose.connect(`mongodb://localhost/${databaseName}`);
      console.log(`Connected to MongoDB database: ${databaseName}`);
    } catch (error) {
      console.error(`Error connecting to MongoDB database: ${databaseName}`, error);
    }
  },
};

const opinionSchema = createOpinionSchema();
const ScOpinion = createScOpinionModel(opinionSchema);

export { ScOpinion, db };