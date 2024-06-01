import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlockchainService } from './blockchain.service';
import { BlockchainController } from './blockchain.controller';
import { BlockSchema } from './schemas/block.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Block', schema: BlockSchema }]),
  ],
  providers: [BlockchainService],
  controllers: [BlockchainController],
})
export class BlockChainModule {}
