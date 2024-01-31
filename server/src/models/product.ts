import { Schema, model } from "mongoose";

export interface IProduct {
  productName: string;
  price: number;
  description: string;
  imageUrl: string;
  stockQuantity: number;
}

const ProductSchema = new Schema<IProduct>({
  productName: { type: String, required: true},
  price: { type: Number, required: true, min: [1, 'Price should be above 1']},
  description: { type: String, required: true},
  imageUrl: { type: String, required: true},
  stockQuantity: { type: Number, required: true, min: [0, 'Stock cant be lower than zero']}
})

export const ProductModel = model<IProduct>("product", ProductSchema);
