import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';

@Controller('blockchain')
export class BlockchainController {
  constructor(private readonly blockchainService: BlockchainService) {}

  @Post('create-genesis')
  async createGenesisBlock(
    @Body() data: any,
  ): Promise<{ id: string; hash: string }> {
    return await this.blockchainService.createGenesisBlock(data);
  }

  @Post('add-block/:blockchainId')
  async addBlock(
    @Body() data: any,
    @Param('blockchainId') blockchainId: string,
  ): Promise<{ hash: string }> {
    return await this.blockchainService.addBlock(data, blockchainId);
  }

  @Get(':blockchainId')
  async getBlockchain(
    @Param('blockchainId') blockchainId: string,
  ): Promise<any[]> {
    return await this.blockchainService.getBlockchain(blockchainId);
  }

  @Get('provenance/:hash')
  async getProductProvenance(
    @Param('hash') productHash: string,
  ): Promise<any[]> {
    return await this.blockchainService.getProductProvenance(productHash);
  }

  @Get('validate/:blockchainId')
  async validateBlockchain(
    @Param('blockchainId') blockchainId: string,
  ): Promise<boolean> {
    return await this.blockchainService.validateBlockchain(blockchainId);
  }
}
