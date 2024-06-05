import { Controller, Get, Post, Body, Param, Logger } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';

@Controller('blockchain')
export class BlockchainController {
  private readonly logger = new Logger(BlockchainController.name);

  constructor(private readonly blockchainService: BlockchainService) {}

  @Post('create-genesis')
  async createGenesisBlock(
    @Body() data: any,
  ): Promise<{ id: string; hash: string }> {
    try {
      return await this.blockchainService.createGenesisBlock(data);
    } catch (error) {
      this.logger.error('Failed to create genesis block', error.stack);
      throw new Error('Failed to create genesis block');
    }
  }

  @Post('add-block/:blockchainId')
  async addBlock(
    @Body() data: any,
    @Param('blockchainId') blockchainId: string,
  ): Promise<{ hash: string }> {
    try {
      return await this.blockchainService.addBlock(data, blockchainId);
    } catch (error) {
      this.logger.error('Failed to add block', error.stack);
      throw new Error('Failed to add block');
    }
  }

  @Get(':blockchainId')
  async getBlockchain(
    @Param('blockchainId') blockchainId: string,
  ): Promise<any[]> {
    try {
      return await this.blockchainService.getBlockchain(blockchainId);
    } catch (error) {
      this.logger.error('Failed to get blockchain', error.stack);
      throw new Error('Failed to get blockchain');
    }
  }

  @Get('provenance/:hash')
  async getProductProvenance(
    @Param('hash') productHash: string,
  ): Promise<any[]> {
    try {
      return await this.blockchainService.getProductProvenance(productHash);
    } catch (error) {
      this.logger.error('Failed to get product provenance', error.stack);
      throw new Error('Failed to get product provenance');
    }
  }

  @Get('validate/:blockchainId')
  async validateBlockchain(
    @Param('blockchainId') blockchainId: string,
  ): Promise<boolean> {
    try {
      return await this.blockchainService.validateBlockchain(blockchainId);
    } catch (error) {
      this.logger.error('Failed to validate blockchain', error.stack);
      throw new Error('Failed to validate blockchain');
    }
  }

  @Get('validate-suppliers/:productId')
  async validateSuppliersByProduct(
    @Param('productId') productId: string,
  ): Promise<boolean> {
    try {
      return await this.blockchainService.validateSuppliersByProduct(productId);
    } catch (error) {
      this.logger.error('Failed to validate suppliers by product', error.stack);
      throw new Error('Failed to validate suppliers by product');
    }
  }
}
