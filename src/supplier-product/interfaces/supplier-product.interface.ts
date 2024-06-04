export interface SupplierProduct {
  productId: string;
  supplierId: string;
  confirmedBySupplier: boolean;
  relationHash: string;
  createdAt: Date;
  updatedAt: Date;
}
