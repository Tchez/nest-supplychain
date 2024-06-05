import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { BlockchainService } from './blockchain.service';
import { CreateProductDto } from './dto/create-product.dto';
import { InviteSupplierDto } from './dto/invite-supplier.dto';
import { ConfirmSupplierDto } from './dto/confirm-supplier.dto';
import { RegisterSupplierDto } from './dto/register-supplier.dto';
import { AlterProductDto } from './dto/alter-product.dto';

@Controller('blockchain')
export class BlockchainController {
  private readonly logger = new Logger(BlockchainController.name);

  constructor(private readonly blockchainService: BlockchainService) {}

  @Post('create-product')
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<{ id: string; hash: string }> {
    if (
      !createProductDto ||
      createProductDto.type !== 'creating_product' ||
      !createProductDto.data
    ) {
      throw new BadRequestException(
        'Invalid data format. Expected { type: "creating_product", data: { ... } }',
      );
    }

    try {
      return await this.blockchainService.createGenesisBlock(createProductDto);
    } catch (error) {
      this.logger.error('Failed to create product', error.stack);
      throw new Error('Failed to create product');
    }
  }

  @Post('invite-supplier/:blockchainId')
  async inviteSupplier(
    @Body() inviteSupplierDto: InviteSupplierDto,
    @Param('blockchainId') blockchainId: string,
  ): Promise<{ hash: string }> {
    if (
      !inviteSupplierDto ||
      inviteSupplierDto.type !== 'inviting_supplier' ||
      !inviteSupplierDto.data
    ) {
      throw new BadRequestException(
        'Invalid data format. Expected { type: "inviting_supplier", data: { ... } }',
      );
    }

    try {
      return await this.blockchainService.addBlock(
        inviteSupplierDto,
        blockchainId,
      );
    } catch (error) {
      this.logger.error('Failed to invite supplier', error.stack);
      throw new Error('Failed to invite supplier');
    }
  }

  @Post('confirm-supplier/:blockchainId')
  async confirmSupplier(
    @Body() confirmSupplierDto: ConfirmSupplierDto,
    @Param('blockchainId') blockchainId: string,
  ): Promise<{ hash: string }> {
    if (
      !confirmSupplierDto ||
      confirmSupplierDto.type !== 'confirm_inviting_supplier' ||
      !confirmSupplierDto.data
    ) {
      throw new BadRequestException(
        'Invalid data format. Expected { type: "confirm_inviting_supplier", data: { ... } }',
      );
    }

    try {
      return await this.blockchainService.addBlock(
        confirmSupplierDto,
        blockchainId,
      );
    } catch (error) {
      this.logger.error('Failed to confirm supplier', error.stack);
      throw new Error('Failed to confirm supplier');
    }
  }

  @Post('register-supplier/:blockchainId')
  async registerSupplier(
    @Body() registerSupplierDto: RegisterSupplierDto,
    @Param('blockchainId') blockchainId: string,
  ): Promise<{ hash: string }> {
    if (
      !registerSupplierDto ||
      registerSupplierDto.type !== 'inviting_supplier_cadastrado com sucesso' ||
      !registerSupplierDto.data
    ) {
      throw new BadRequestException(
        'Invalid data format. Expected { type: "inviting_supplier_cadastrado com sucesso", data: { ... } }',
      );
    }

    try {
      return await this.blockchainService.addBlock(
        registerSupplierDto,
        blockchainId,
      );
    } catch (error) {
      this.logger.error('Failed to register supplier', error.stack);
      throw new Error('Failed to register supplier');
    }
  }

  @Post('alter-product/:blockchainId')
  async alterProduct(
    @Body() alterProductDto: AlterProductDto,
    @Param('blockchainId') blockchainId: string,
  ): Promise<{ hash: string }> {
    if (
      !alterProductDto ||
      alterProductDto.type !== 'altering_product' ||
      !alterProductDto.data
    ) {
      throw new BadRequestException(
        'Invalid data format. Expected { type: "altering_product", data: { ... } }',
      );
    }

    try {
      return await this.blockchainService.addBlock(
        alterProductDto,
        blockchainId,
      );
    } catch (error) {
      this.logger.error('Failed to alter product', error.stack);
      throw new Error('Failed to alter product');
    }
  }

  @Get(':blockchainId')
  async getBlockchain(
    @Param('blockchainId') blockchainId: string,
  ): Promise<any[]> {
    if (!blockchainId) {
      throw new BadRequestException('Blockchain ID is required');
    }

    try {
      return await this.blockchainService.getBlockchain(blockchainId);
    } catch (error) {
      this.logger.error('Failed to get blockchain', error.stack);
      throw new Error('Failed to get blockchain');
    }
  }

  @Get('validate/:blockchainId')
  async validateBlockchain(
    @Param('blockchainId') blockchainId: string,
  ): Promise<boolean> {
    if (!blockchainId) {
      throw new BadRequestException('Blockchain ID is required');
    }

    try {
      return await this.blockchainService.validateBlockchain(blockchainId);
    } catch (error) {
      this.logger.error('Failed to validate blockchain', error.stack);
      throw new Error('Failed to validate blockchain');
    }
  }

  @Get('validate-suppliers/:blockchainId')
  async validateSuppliersByBlockchain(
    @Param('blockchainId') blockchainId: string,
  ): Promise<boolean> {
    if (!blockchainId) {
      throw new BadRequestException('Blockchain ID is required');
    }

    try {
      return await this.blockchainService.validateSuppliersByBlockchain(
        blockchainId,
      );
    } catch (error) {
      this.logger.error(
        'Failed to validate suppliers by blockchain',
        error.stack,
      );
      throw new Error('Failed to validate suppliers by blockchain');
    }
  }
}
