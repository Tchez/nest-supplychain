import {
  Controller,
  Get,
  Post,
  Body,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { BlockchainService } from './blockchain.service';

@Controller('blockchain')
export class BlockchainController {
  private readonly logger = new Logger('BlockchainController');
  constructor(private readonly blockchainService: BlockchainService) {}

  @Post('add-block')
  async addBlock(@Body('data') data: string): Promise<string> {
    try {
      if (!data) {
        throw new BadRequestException('Data is required');
      }

      const blocks = await this.blockchainService.getBlockchain();

      if (blocks.length === 0) {
        await this.blockchainService.createGenesisBlock();
      }

      const block = await this.blockchainService.addBlock(data);
      return block.hash;
    } catch (error) {
      this.logger.error(error);
      return error.message;
    }
  }

  @Get()
  async getBlockchain(): Promise<any[]> {
    return await this.blockchainService.getBlockchain();
  }

  @Get('validate')
  async validateBlockchain(): Promise<boolean> {
    return await this.blockchainService.validateBlockchain();
  }
}
