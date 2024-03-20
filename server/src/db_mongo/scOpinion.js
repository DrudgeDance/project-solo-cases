import mongoose from 'mongoose';

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
});
//Compond index for uniqueness
opinionSchema.index({ 'docketNo.fiscalYear': 1, 'docketNo.sequenceNo': 1 }, { unique: true });

const scOpinion = mongoose.model('scOpinion', opinionSchema);

export default scOpinion;