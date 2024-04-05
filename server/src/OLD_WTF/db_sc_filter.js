// import mongoose from 'mongoose';
// import { generateDocumentHash } from './documentHashUtility.js';

// const createSupremeCtSchema = () => {
//   const opinionSchema = new mongoose.Schema({
//     date: Date,
//     docketNo: {
//       fiscalYear: String,
//       sequenceNo: String,
//     },
//     parties: {
//       petitioner: String,
//       respondent: String,
//     },
//     url: {
//       baseUrl: String,
//       path: String,
//       fileName: String,
//     },
//     justice: String,
//     citation: String,
//     decisionSummary: String, 
//     _docHash: String,
//   });

//   opinionSchema.index({ 'docketNo.fiscalYear': 1, 'docketNo.sequenceNo': 1 }, { unique: true });

//   opinionSchema.pre('save', function(next) {
//     this._docHash = generateDocumentHash(this);
//     next();
//   });

//   return opinionSchema;
// };

// const createScOpinionModel = (opinionSchema) => {
//   return mongoose.model('ScOpinion', opinionSchema);
// };

// const filDb = {

//   async connect( databaseName ) {
//     try {
//       await mongoose.connect(`mongodb://localhost/${databaseName}`);
//       console.log(`Connected to MongoDB database: ${databaseName}`);
//     } catch (error) {
//       console.error(`Connection at ${databaseName} error:, error.message`);
//     }
//   },

//   async close( databaseName ) {
//     try {
//       await mongoose.disconnect();
//       console.log(`Disconnected from MongoDB ${databaseName}`);
//     } catch ( error ) {
//       console.error(`Disconnection at ${databaseName} error: ${error.message}`);
//     }
//   }

// };

// const opinionSchema = createSupremeCtSchema();
// const scOpinion = createScOpinionModel(opinionSchema);

// export { ScOpinion, filDb };


