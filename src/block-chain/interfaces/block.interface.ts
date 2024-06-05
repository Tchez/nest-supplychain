import { Document } from 'mongoose';

export interface Block extends Document {
  readonly index: number;
  readonly timestamp: Date;
  readonly data: string;
  readonly previousHash: string;
  readonly hash: string;
  readonly nonce: number;
  readonly blockchainId: string;
}
