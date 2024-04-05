// import scOpinion from './scOpinion.js';

// const insertOrUpdateOpinion = async (opinionData) => {

//   try {
//       const existingOpinion = await scOpinion.findOne({ 
//       'docketNo.fiscalYear': opinionData.docketNo.fiscalYear, 
//       'docketNo.sequenceNo': opinionData.docketNo.sequenceNo 
//     }).exec();

//     if (existingOpinion) {
//       const isDifferent = Object.keys(opinionData).some(key => opinionData[key] !== existingOpinion[key]);
//       if (isDifferent) {
//         await scOpinion.updateOne({ 
//           'docket.fiscalYear': opinionData.docketNo.fiscalYear, 
//           'docket.sequenceNo': opinionData.docketNo.sequenceNo 
//         }, opinionData);
//         console.log(`Updated: ${opinionData.parties.petitioner} v. ${opinionData.parties.respondent}, 
//                             ${opinionData.docketNo.fiscalYear}-${opinionData.docketNo.sequenceNo}, 
//                             ${opinionData.citation}, 
//                             ${opinionData.link},
//                             ${opinionData.date}`);
//       }
//     } else {
//       const newOpinion = new scOpinion(opinionData);
//       await newOpinion.save();
//       console.log(`Inserted ${opinionData.docketNo.fiscalYear}-${opinionData.docketNo.sequenceNo}`);
//     }
//   } catch (error) {
//     console.error(`Error in insertOrUpdateOpinion: ${error.message}`)
//   }


// };

// export default insertOrUpdateOpinion;