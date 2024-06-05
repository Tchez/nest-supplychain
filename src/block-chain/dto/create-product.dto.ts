export class CreateProductDto {
  readonly type: string;
  readonly data: {
    id: string;
    name: string;
    description: string;
    category: string;
  };
}
