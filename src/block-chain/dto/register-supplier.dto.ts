export class RegisterSupplierDto {
  readonly type: string;
  readonly data: {
    email: string;
    name: string;
    cnpj: string;
  };
}
