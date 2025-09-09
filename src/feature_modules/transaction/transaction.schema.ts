import mongoose, { Schema } from "mongoose";

export interface ITransaction extends Document {
  type: "sale" | "purchase";
  customerId?: string;
  vendorId?: string;
  products: { productId: string; quantity: number; price: number }[];
  totalAmount: number;
  date: Date;
  businessId: string;
}

const transactionSchema = new Schema<ITransaction>(
  {
    type: { type: String, enum: ["sale", "purchase"], required: true },
    customerId: { type: String },
    vendorId: { type: String },
    products: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    businessId: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ITransaction>("Transaction", transactionSchema);