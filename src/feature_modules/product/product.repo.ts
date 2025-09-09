import Product, { IProduct } from "./product.schema";
import { FilterQuery, UpdateQuery } from "mongoose";

const createProduct = async (product: Partial<IProduct>) => {
  return await Product.create(product);
};

const getProductById = async (id: string) => {
  return await Product.findById(id);
};

const listProducts = async (filter: FilterQuery<IProduct> = {}, limit = 10, skip = 0) => {
  const rows = await Product.find(filter).limit(limit).skip(skip);
  const count = await Product.countDocuments(filter);
  return { rows, count };
};

const updateProduct = async (id: string, update: UpdateQuery<IProduct>) => {
  return await Product.findByIdAndUpdate(id, update, { new: true });
};

const deleteProduct = async (id: string) => {
  return await Product.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};

const searchProduct = async (keyword: string) => {
  return await Product.find({
    $or: [
      { name: { $regex: keyword, $options: "i" } },
      { category: { $regex: keyword, $options: "i" } },
    ],
  });
};

export default {
  createProduct,
  getProductById,
  listProducts,
  updateProduct,
  deleteProduct,
  searchProduct,
};
