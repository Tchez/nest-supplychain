import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlockChainModule } from './block-chain/block-chain.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { SupplierModule } from './supplier/supplier.module';
import { SupplierProductModule } from './supplier-product/supplier-product.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/blockchain'),
    BlockChainModule,
    ProductModule,
    SupplierModule,
    SupplierProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
