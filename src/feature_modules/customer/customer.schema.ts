import mongoose, { Schema } from "mongoose";

export interface IContact extends Document {
  name: string;
  phone: string;
  email: string;
  address: string;
  type: "customer" | "vendor";
  businessId: string;
}

const contactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    type: { type: String, enum: ["customer", "vendor"], required: true },
    businessId: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IContact>("Contact", contactSchema);