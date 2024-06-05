import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    example: 'create_product',
    description: 'The type of the block',
  })
  readonly type: string;

  @ApiProperty({ description: 'The data of the product' })
  readonly data: {
    id: string;
    name: string;
    description: string;
    category: string;
  };
}
