export interface Block {
  index: number;
  timestamp: Date;
  data: string;
  previousHash: string;
  hash: string;
  nonce: number;
}
