import { ApiProperty } from '@nestjs/swagger';

export class InviteSupplierDto {
  @ApiProperty({
    example: 'invite_supplier',
    description: 'The type of the block',
  })
  readonly type: string;

  @ApiProperty({ description: 'The data of the supplier invitation' })
  readonly data: {
    email: string;
    name: string;
    cnpj: string;
  };
}
