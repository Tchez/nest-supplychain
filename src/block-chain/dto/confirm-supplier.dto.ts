export class ConfirmSupplierDto {
  readonly type: string;
  readonly data: {
    email: string;
    name: string;
    cnpj: string;
  };
}
