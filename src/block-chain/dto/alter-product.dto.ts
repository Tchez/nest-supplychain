import { ApiProperty } from '@nestjs/swagger';

export class AlterProductDto {
  @ApiProperty({
    example: 'alter_product',
    description: 'The type of the block',
  })
  readonly type: string;

  @ApiProperty({ description: 'The data of the product alteration' })
  readonly data: {
    id: string;
    name: string;
    description: string;
    category: string;
  };
}
