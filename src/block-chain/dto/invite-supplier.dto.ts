export class InviteSupplierDto {
  readonly type: string;
  readonly data: {
    email: string;
    name: string;
    cnpj: string;
  };
}
