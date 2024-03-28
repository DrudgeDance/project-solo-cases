import { generateDocumentHash } from './hashUtils.js';

export async function verifyDocumentIntegrity(doc) {
  if (!doc) return false; // No document to verify
  const currentHash = generateDocumentHash(doc);
  return doc._docHash === currentHash;
}

// Assuming `Opinion` is your model imported from elsewhere
import Opinion from './opinionSchema.js';

export const findOpinionWithIntegrityCheck = async (criteria) => {
  const opinion = await Opinion.findOne(criteria);
  const isValid = await verifyDocumentIntegrity(opinion);
  if (!isValid) {
    throw new Error('Document integrity check failed');
  }
  return opinion;
};


// //verify output
// import { findOpinionWithIntegrityCheck } from './documentIntegrity.js';

// // Example usage
// async function checkAndFetchOpinion(criteria) {
//   try {
//     const opinion = await findOpinionWithIntegrityCheck(criteria);
//     console.log(opinion);
//   } catch (error) {
//     console.error(error.message);
//   }
// }

// opinionSchema.post('find', function(docs) {
//   // This example assumes docs are plain objects due to `lean()`
//   docs.forEach(doc => {
//     const currentHash = generateDocumentHash(doc);
//     if (doc._docHash !== currentHash) {
//       throw new Error('Document integrity check failed for one or more documents.');
//     }
//   });
// });

// opinionSchema.post('findOne', function(doc) {
//   // This assumes doc is a plain object due to `lean()`
//   if (doc) {
//     const currentHash = generateDocumentHash(doc);
//     if (doc._docHash !== currentHash) {
//       throw new Error('Document integrity check failed.');
//     }
//   }
// });
