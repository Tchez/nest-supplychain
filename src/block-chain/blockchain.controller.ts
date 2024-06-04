import {
  Controller,
  Get,
  Post,
  Body,
  Logger,
  BadRequestException,
  Param,
} from '@nestjs/common';
import { BlockchainService } from './blockchain.service';

@Controller('blockchain')
export class BlockchainController {
  private readonly logger = new Logger('BlockchainController');
  constructor(private readonly blockchainService: BlockchainService) {}

  @Post('create-genesis')
  async createGenesisBlock(
    @Body() data: any,
  ): Promise<{ id: string; hash: string }> {
    try {
      if (!data || Object.keys(data).length === 0) {
        throw new BadRequestException('Data is required!');
      }

      return await this.blockchainService.createGenesisBlock(data);
    } catch (error) {
      this.logger.error(error);
      return error.message;
    }
  }

  @Post('add-block/:blockchainId')
  async addBlock(
    @Body() data: any,
    @Param('blockchainId') blockchainId: string,
  ): Promise<{ hash: string }> {
    try {
      if (!data || Object.keys(data).length === 0) {
        throw new BadRequestException('Data is required!');
      }

      return await this.blockchainService.addBlock(data, blockchainId);
    } catch (error) {
      this.logger.error(error);
      return error.message;
    }
  }

  @Get(':blockchainId')
  async getBlockchain(
    @Param('blockchainId') blockchainId: string,
  ): Promise<any[]> {
    try {
      if (!blockchainId) {
        throw new BadRequestException('Blockchain ID is required');
      }

      return await this.blockchainService.getBlockchain(blockchainId);
    } catch (error) {
      this.logger.error(error);
      return error.message;
    }
  }

  @Get('provenance/:hash')
  async getProductProvenance(
    @Param('hash') productHash: string,
  ): Promise<any[]> {
    try {
      if (!productHash) {
        throw new BadRequestException('Product hash is required');
      }

      return await this.blockchainService.getProductProvenance(productHash);
    } catch (error) {
      this.logger.error(error);
      return error.message;
    }
  }

  @Get('validate/:blockchainId')
  async validateBlockchain(
    @Param('blockchainId') blockchainId: string,
  ): Promise<boolean> {
    try {
      if (!blockchainId) {
        throw new BadRequestException('Blockchain ID is required');
      }
      return await this.blockchainService.validateBlockchain(blockchainId);
    } catch (error) {
      this.logger.error(error);
      return error.message;
    }
  }
}
