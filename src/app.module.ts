import { Module } from '@nestjs/common';
import { BlockChainModule } from './block-chain/block-chain.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/blockchain'),
    BlockChainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
