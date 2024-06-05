import { ApiProperty } from '@nestjs/swagger';

export class ConfirmSupplierDto {
  @ApiProperty({
    example: 'confirm_supplier',
    description: 'The type of the block',
  })
  readonly type: string;

  @ApiProperty({ description: 'The data of the supplier confirmation' })
  readonly data: {
    email: string;
    name: string;
    cnpj: string;
  };
}
