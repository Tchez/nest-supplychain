import { Schema } from 'mongoose';

export const SupplierProductSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  supplierId: { type: Schema.Types.ObjectId, ref: 'Supplier', required: true },
  confirmedBySupplier: { type: Boolean, default: false },
  relationHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
