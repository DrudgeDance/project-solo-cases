import mongoose from 'mongoose';
import { generateDocumentHash } from './documentHashUtility.js';

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
//Compond index for uniqueness
opinionSchema.index({ 'docketNo.fiscalYear': 1, 'docketNo.sequenceNo': 1 }, { unique: true });

opinionSchema.pre('save', function(next) {
  // `this` refers to the document being saved
  this._docHash = generateDocumentHash(this);
  next();
});


const scOpinion = mongoose.model('scOpinion', opinionSchema);

export default scOpinion;