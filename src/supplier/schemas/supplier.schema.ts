import { Schema } from 'mongoose';

export const SupplierSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cnpj: { type: String, required: true },
});
