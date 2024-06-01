import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as crypto from 'crypto';
import { Block } from './interfaces/block.interface';

@Injectable()
export class BlockchainService {
  private readonly DIFFICULTY = '00';

  constructor(
    @InjectModel('Block') private readonly blockModel: Model<Block>,
  ) {}

  async createGenesisBlock(): Promise<Block> {
    const genesisBlock: Block = {
      index: 0,
      timestamp: new Date(),
      data: 'Genesis Block',
      previousHash: '0',
      nonce: 0,
      hash: this.calculateHash(0, new Date(), 'Genesis Block', '0', 0),
    };

    try {
      const createdBlock = new this.blockModel(genesisBlock);
      return await createdBlock.save();
    } catch (error) {
      return error;
    }
  }

  private calculateHash(
    index: number,
    timestamp: Date,
    data: string,
    previousHash: string,
    nonce: number,
  ): string {
    return crypto
      .createHash('sha256')
      .update(index + timestamp.toString() + data + previousHash + nonce)
      .digest('hex');
  }

  async mineBlock(
    index: number,
    timestamp: Date,
    data: string,
    previousHash: string,
  ): Promise<{ hash: string; nonce: number }> {
    let nonce = 0;
    let hash: string;

    do {
      hash = this.calculateHash(index, timestamp, data, previousHash, nonce);
      nonce++;
    } while (!hash.startsWith(this.DIFFICULTY));

    return { hash, nonce: nonce - 1 };
  }

  async addBlock(data: string): Promise<Block> {
    try {
      const lastBlock = await this.blockModel.findOne().sort({ index: -1 });

      const newBlockData = {
        index: lastBlock.index + 1,
        timestamp: new Date(),
        data,
        previousHash: lastBlock.hash,
      };

      const { hash, nonce } = await this.mineBlock(
        newBlockData.index,
        newBlockData.timestamp,
        newBlockData.data,
        newBlockData.previousHash,
      );

      const newBlock = {
        ...newBlockData,
        hash,
        nonce,
      };

      const createdBlock = new this.blockModel(newBlock);
      return await createdBlock.save();
    } catch (error) {
      return error;
    }
  }

  async getBlockchain(): Promise<Block[]> {
    try {
      return await this.blockModel.find().sort({ index: 1 });
    } catch (error) {
      return error;
    }
  }

  async validateBlockchain(): Promise<boolean> {
    const blocks = await this.blockModel.find().sort({ index: 1 });

    for (let i = 1; i < blocks.length; i++) {
      const currentBlock = blocks[i];
      const previousBlock = blocks[i - 1];

      if (
        currentBlock.hash !==
        this.calculateHash(
          currentBlock.index,
          currentBlock.timestamp,
          currentBlock.data,
          currentBlock.previousHash,
          currentBlock.nonce,
        )
      ) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}
