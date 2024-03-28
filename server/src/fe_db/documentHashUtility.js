import crypto from 'crypto';

export function generateHash(input) {
  return crypto.createHash('sha256').update(JSON.stringify(input), 'utf8').digest('hex');
}

export function generateDocumentHash(doc) {
  const docketHash = generateHash(doc.docketNo);
  const partiesHash = generateHash(doc.parties);
  const urlHash = generateHash(doc.url);
  // Concatenate all hashes and generate a master hash
  const combinedHashInput = `${docketHash}${partiesHash}${urlHash}`;
  return generateHash(combinedHashInput);
}