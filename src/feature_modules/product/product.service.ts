import { FilterQuery } from "mongoose";
import productRepo from "./product.repo";
import { IProduct } from "./product.schema";

const createProduct = async (data: Partial<IProduct>) => {
  return await productRepo.createProduct(data);
};

const getProductById = async (id: string) => {
  const product = await productRepo.getProductById(id);
  if (!product) throw new Error("Product not found");
  return product;
};

const listProducts = async (
  filter: FilterQuery<IProduct>, 
  limit: number, 
  skip: number
) => {
  return await productRepo.listProducts(filter, limit, skip);
};


const updateProduct = async (id: string, data: Partial<IProduct>) => {
  const product = await productRepo.updateProduct(id, data);
  if (!product) throw new Error("Product not found");
  return product;
};

const deleteProduct = async (id: string) => {
  const product = await productRepo.deleteProduct(id);
  if (!product) throw new Error("Product not found");
  return product;
};

const searchProduct = async (keyword: string) => {
  return await productRepo.searchProduct(keyword);
};

export default {
  createProduct,
  getProductById,
  listProducts,
  updateProduct,
  deleteProduct,
  searchProduct,
};
