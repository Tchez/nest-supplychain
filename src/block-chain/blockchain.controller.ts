import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { BlockchainService } from './blockchain.service';
import { CreateProductDto } from './dto/create-product.dto';
import { InviteSupplierDto } from './dto/invite-supplier.dto';
import { ConfirmSupplierDto } from './dto/confirm-supplier.dto';
import { RegisterSupplierDto } from './dto/register-supplier.dto';
import { AlterProductDto } from './dto/alter-product.dto';

@ApiTags('blockchain')
@Controller('blockchain')
export class BlockchainController {
  private readonly logger = new Logger(BlockchainController.name);

  constructor(private readonly blockchainService: BlockchainService) {}

  @Post('create-product')
  @ApiOperation({
    summary:
      'Creates a blockchain as a product ledger to store a history of changes and records related to it.',
  })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid data format.' })
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<{ id: string; hash: string }> {
    if (
      !createProductDto ||
      createProductDto.type !== 'create_product' ||
      !createProductDto.data
    ) {
      throw new BadRequestException(
        'Invalid data format. Expected { type: "create_product", data: { ... } }',
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
  @ApiOperation({
    summary:
      'Adds a record (block) indicating that a supplier has been invited to appear to the end user as a supplier for the product.',
  })
  @ApiParam({
    name: 'blockchainId',
    required: true,
    description: 'The ID of the blockchain.',
  })
  @ApiBody({ type: InviteSupplierDto })
  @ApiResponse({
    status: 201,
    description: 'The supplier has been successfully invited.',
  })
  @ApiResponse({ status: 400, description: 'Invalid data format.' })
  async inviteSupplier(
    @Body() inviteSupplierDto: InviteSupplierDto,
    @Param('blockchainId') blockchainId: string,
  ): Promise<{ hash: string }> {
    if (
      !inviteSupplierDto ||
      inviteSupplierDto.type !== 'invite_supplier' ||
      !inviteSupplierDto.data
    ) {
      throw new BadRequestException(
        'Invalid data format. Expected { type: "invite_supplier", data: { ... } }',
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
  @ApiOperation({
    summary:
      'Adds a record (block) indicating that a supplier has confirmed its participation in the product.',
  })
  @ApiParam({
    name: 'blockchainId',
    required: true,
    description: 'The ID of the blockchain.',
  })
  @ApiBody({ type: ConfirmSupplierDto })
  @ApiResponse({
    status: 201,
    description:
      "The supplier's participation has been successfully confirmed.",
  })
  @ApiResponse({ status: 400, description: 'Invalid data format.' })
  async confirmSupplier(
    @Body() confirmSupplierDto: ConfirmSupplierDto,
    @Param('blockchainId') blockchainId: string,
  ): Promise<{ hash: string }> {
    if (
      !confirmSupplierDto ||
      confirmSupplierDto.type !== 'confirm_supplier' ||
      !confirmSupplierDto.data
    ) {
      throw new BadRequestException(
        'Invalid data format. Expected { type: "confirm_supplier", data: { ... } }',
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
  @ApiOperation({
    summary:
      'Adds a record (block) indicating that a supplier has also registered in the application, adding an ID to identify it in future searches.',
  })
  @ApiParam({
    name: 'blockchainId',
    required: true,
    description: 'The ID of the blockchain.',
  })
  @ApiBody({ type: RegisterSupplierDto })
  @ApiResponse({
    status: 201,
    description: 'The supplier has been successfully registered.',
  })
  @ApiResponse({ status: 400, description: 'Invalid data format.' })
  async registerSupplier(
    @Body() registerSupplierDto: RegisterSupplierDto,
    @Param('blockchainId') blockchainId: string,
  ): Promise<{ hash: string }> {
    if (
      !registerSupplierDto ||
      registerSupplierDto.type !== 'register_supplier' ||
      !registerSupplierDto.data
    ) {
      throw new BadRequestException(
        'Invalid data format. Expected { type: "register_supplier", data: { ... } }',
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
  @ApiOperation({
    summary:
      'Adds a block indicating that the product was altered, containing its new information in the data field (which will be validated through the blockchain hash and PoW, as well as the relational database).',
  })
  @ApiParam({
    name: 'blockchainId',
    required: true,
    description: 'The ID of the blockchain.',
  })
  @ApiBody({ type: AlterProductDto })
  @ApiResponse({
    status: 201,
    description: 'The product information has been successfully altered.',
  })
  @ApiResponse({ status: 400, description: 'Invalid data format.' })
  async alterProduct(
    @Body() alterProductDto: AlterProductDto,
    @Param('blockchainId') blockchainId: string,
  ): Promise<{ hash: string }> {
    if (
      !alterProductDto ||
      alterProductDto.type !== 'alter_product' ||
      !alterProductDto.data
    ) {
      throw new BadRequestException(
        'Invalid data format. Expected { type: "alter_product", data: { ... } }',
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
  @ApiOperation({
    summary: 'Returns all blocks from a blockchain (product records).',
  })
  @ApiParam({
    name: 'blockchainId',
    required: true,
    description: 'The ID of the blockchain.',
  })
  @ApiResponse({
    status: 200,
    description: 'Blockchain retrieved successfully.',
  })
  @ApiResponse({ status: 400, description: 'Invalid data format.' })
  async getBlockchain(
    @Param('blockchainId') blockchainId: string,
  ): Promise<any[]> {
    if (!blockchainId) {
      throw new BadRequestException('Blockchain ID is required.');
    }

    try {
      return await this.blockchainService.getBlockchain(blockchainId);
    } catch (error) {
      this.logger.error('Failed to get blockchain', error.stack);
      throw new Error('Failed to get blockchain');
    }
  }

  @Get('validate/:blockchainId')
  @ApiOperation({ summary: 'Validates a blockchain.' })
  @ApiParam({
    name: 'blockchainId',
    required: true,
    description: 'The ID of the blockchain.',
  })
  @ApiResponse({
    status: 200,
    description: 'Blockchain validated successfully.',
  })
  @ApiResponse({ status: 400, description: 'Invalid data format.' })
  async validateBlockchain(
    @Param('blockchainId') blockchainId: string,
  ): Promise<boolean> {
    if (!blockchainId) {
      throw new BadRequestException('Blockchain ID is required.');
    }

    try {
      return await this.blockchainService.validateBlockchain(blockchainId);
    } catch (error) {
      this.logger.error('Failed to validate blockchain', error.stack);
      throw new Error('Failed to validate blockchain');
    }
  }

  @Get('validate-suppliers/:blockchainId')
  @ApiOperation({
    summary: 'Validates the suppliers related to a blockchain.',
  })
  @ApiParam({
    name: 'blockchainId',
    required: true,
    description: 'The ID of the blockchain.',
  })
  @ApiResponse({
    status: 200,
    description: 'Suppliers validated successfully.',
  })
  @ApiResponse({ status: 400, description: 'Invalid data format.' })
  async validateSuppliersByBlockchain(
    @Param('blockchainId') blockchainId: string,
  ): Promise<boolean> {
    if (!blockchainId) {
      throw new BadRequestException('Blockchain ID is required.');
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
