import Transaction, { ITransaction } from "./transaction.schema";
import { FilterQuery, UpdateQuery } from "mongoose";

const createTransaction = async (transaction: Partial<ITransaction>) => {
  return await Transaction.create(transaction);
};

const getTransactionById = async (id: string) => {
  return await Transaction.findById(id).populate("products.productId");
};

const listTransactions = async (filter: FilterQuery<ITransaction> = {}, limit = 10, skip = 0) => {
  const data = await Transaction.find(filter)
    .populate("products.productId")
    .limit(limit)
    .skip(skip);

  return { rows: data, count: await Transaction.countDocuments(filter) };
};

const updateTransaction = async (id: string, update: UpdateQuery<ITransaction>) => {
  return await Transaction.findByIdAndUpdate(id, update, { new: true });
};

const deleteTransaction = async (id: string) => {
  return await Transaction.findByIdAndDelete(id);
};

export default {
  createTransaction,
  getTransactionById,
  listTransactions,
  updateTransaction,
  deleteTransaction,
};
