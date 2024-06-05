import { ApiProperty } from '@nestjs/swagger';

export class RegisterSupplierDto {
  @ApiProperty({
    example: 'register_supplier',
    description: 'The type of the block',
  })
  readonly type: string;

  @ApiProperty({ description: 'The data of the supplier registration' })
  readonly data: {
    email: string;
    name: string;
    cnpj: string;
  };
}
