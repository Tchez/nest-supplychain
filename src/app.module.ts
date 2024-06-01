import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlockChainModule } from './block-chain/block-chain.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/blockchain'),
    BlockChainModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
