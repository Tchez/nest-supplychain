import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Block } from './interfaces/block.interface';
import * as crypto from 'crypto';

@Injectable()
export class BlockchainService {
  private readonly logger = new Logger(BlockchainService.name);

  constructor(
    @InjectModel('Block') private readonly blockModel: Model<Block>,
  ) {}

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

  private async mineBlock(
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
    } while (!hash.startsWith('0000')); // Adjust the difficulty as needed

    return { hash, nonce: nonce - 1 };
  }

  async createGenesisBlock(data: any): Promise<{ id: string; hash: string }> {
    try {
      const genesisBlock = {
        index: 0,
        timestamp: new Date(),
        data: JSON.stringify(data),
        previousHash: '0',
        nonce: 0,
        hash: this.calculateHash(0, new Date(), JSON.stringify(data), '0', 0),
      };
      const createdBlock = new this.blockModel(genesisBlock);
      const savedBlock = await createdBlock.save();

      // TODO: Chamar serviço para atualizar hash do produto no banco relacional
      // await this.productService.updateProductHash(savedBlock._id.toString(), savedBlock.hash);

      return { id: savedBlock._id.toString(), hash: savedBlock.hash };
    } catch (error) {
      this.logger.error('Error creating genesis block', error.stack);
      throw new Error('Error creating genesis block');
    }
  }

  async addBlock(data: any, blockchainId: string): Promise<{ hash: string }> {
    try {
      const lastBlock = await this.blockModel
        .findOne({ _id: blockchainId })
        .sort({ index: -1 });
      const newBlockData = {
        index: lastBlock ? lastBlock.index + 1 : 0,
        timestamp: new Date(),
        data: JSON.stringify(data),
        previousHash: lastBlock ? lastBlock.hash : '0',
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
      await createdBlock.save();

      // TODO: Chamar serviço para atualizar hash da relação no banco relacional
      // await this.supplierProductService.updateRelationHash(blockchainId, newBlock.hash);

      return { hash: newBlock.hash };
    } catch (error) {
      this.logger.error('Error adding block', error.stack);
      throw new Error('Error adding block');
    }
  }

  async getBlockchain(blockchainId: string): Promise<Block[]> {
    try {
      return await this.blockModel
        .find({ _id: blockchainId })
        .sort({ index: 1 });
    } catch (error) {
      this.logger.error('Error getting blockchain', error.stack);
      throw new Error('Error getting blockchain');
    }
  }

  async getProductProvenance(productHash: string): Promise<Block[]> {
    try {
      return await this.blockModel
        .find({ data: new RegExp(productHash, 'i') })
        .sort({ index: 1 });
    } catch (error) {
      this.logger.error('Error getting product provenance', error.stack);
      throw new Error('Error getting product provenance');
    }
  }

  async validateBlockchain(blockchainId: string): Promise<boolean> {
    try {
      const blocks = await this.blockModel
        .find({ _id: blockchainId })
        .sort({ index: 1 });

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
    } catch (error) {
      this.logger.error('Error validating blockchain', error.stack);
      throw new Error('Error validating blockchain');
    }
  }
}
