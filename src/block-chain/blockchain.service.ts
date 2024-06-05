import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Block } from './interfaces/block.interface';
import * as crypto from 'crypto';

@Injectable()
export class BlockchainService {
  private readonly logger = new Logger(BlockchainService.name);
  private readonly DIFFICULTY = '00';

  constructor(
    @InjectModel('Block') private readonly blockModel: Model<Block>,
  ) {}

  /**
   * Calculates the SHA-256 hash of the block.
   * @param index - The index of the block.
   * @param timestamp - The timestamp of the block.
   * @param data - The data contained in the block.
   * @param previousHash - The hash of the previous block.
   * @param nonce - The nonce value used for mining.
   * @returns The SHA-256 hash of the block.
   */
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

  /**
   * Mines a block by finding a nonce that produces a hash with the required difficulty.
   * @param index - The index of the block.
   * @param timestamp - The timestamp of the block.
   * @param data - The data contained in the block.
   * @param previousHash - The hash of the previous block.
   * @returns An object containing the hash and nonce of the mined block.
   */
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
    } while (!hash.startsWith(this.DIFFICULTY));

    return { hash, nonce: nonce - 1 };
  }

  /**
   * Creates the genesis block for a new blockchain.
   * @param data - The data to be included in the genesis block.
   * @returns An object containing the ID and hash of the created genesis block.
   */
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
      this.logger.warn(
        'TODO: Chamar serviço para atualizar hash do produto no banco relacional',
      );
      // await this.productService.updateProductHash(savedBlock._id.toString(), savedBlock.hash);

      return { id: savedBlock._id.toString(), hash: savedBlock.hash };
    } catch (error) {
      this.logger.error('Error creating genesis block', error.stack);
      throw new Error('Error creating genesis block');
    }
  }

  /**
   * Adds a new block to the blockchain.
   * @param data - The data to be included in the block.
   * @param blockchainId - The ID of the blockchain.
   * @returns The hash of the created block.
   */
  async addBlock(data: any, blockchainId: string): Promise<{ hash: string }> {
    try {
      const lastBlock = await this.blockModel
        .findOne({ blockchainId })
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
      this.logger.warn(
        'TODO: Chamar serviço para atualizar hash da relação no banco relacional',
      );
      // await this.supplierProductService.updateRelationHash(blockchainId, newBlock.hash);

      return { hash: newBlock.hash };
    } catch (error) {
      this.logger.error('Error adding block', error.stack);
      throw new Error('Error adding block');
    }
  }

  /**
   * Retrieves the blockchain by its ID.
   * @param blockchainId - The ID of the blockchain.
   * @returns An array of blocks in the blockchain.
   */
  async getBlockchain(blockchainId: string): Promise<Block[]> {
    try {
      return await this.blockModel.find({ blockchainId }).sort({ index: 1 });
    } catch (error) {
      this.logger.error('Error getting blockchain', error.stack);
      throw new Error('Error getting blockchain');
    }
  }

  /**
   * Validates the integrity of a blockchain.
   * @param blockchainId - The ID of the blockchain.
   * @returns A boolean indicating whether the blockchain is valid.
   */
  async validateBlockchain(blockchainId: string): Promise<boolean> {
    try {
      const blocks = await this.blockModel
        .find({ blockchainId })
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

  /**
   * Validates all suppliers related to a specific blockchain.
   * @param blockchainId - The ID of the blockchain.
   * @returns A boolean indicating whether all related suppliers are valid.
   */
  async validateSuppliersByBlockchain(blockchainId: string): Promise<boolean> {
    try {
      // TODO: Buscar fornecedores relacionados ao produto do banco relacional
      this.logger.warn(
        'TODO: Função depende da busca dos fornecedores relacionados ao produto do banco relacional para funcionar',
      );
      // const suppliers = await this.supplierProductService.getSuppliersByProduct(productId);

      const blocks = await this.blockModel
        .find({ blockchainId })
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
      this.logger.error(
        'Error validating suppliers by blockchain',
        error.stack,
      );
      throw new Error('Error validating suppliers by blockchain');
    }
  }
}
