import { Schema } from 'mongoose';

export const BlockSchema = new Schema({
  index: { type: Number, required: true },
  timestamp: { type: Date, required: true },
  data: { type: String, required: true },
  previousHash: { type: String, required: true },
  hash: { type: String, required: true },
  nonce: { type: Number, required: true },
  blockchainId: { type: String, required: true },
});
