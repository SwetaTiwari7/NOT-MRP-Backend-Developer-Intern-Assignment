import transactionRepo from "./transaction.repo";

const createTransaction = async (data: any) => {
  return await transactionRepo.createTransaction(data);
};

const getTransactionById = async (id: string) => {
  const trx = await transactionRepo.getTransactionById(id);
  if (!trx) throw new Error("Transaction not found");
  return trx;
};

const listTransactions = async (filter: any, limit: number, skip: number) => {
  return await transactionRepo.listTransactions(filter, limit, skip);
};

const updateTransaction = async (id: string, data: any) => {
  const trx = await transactionRepo.updateTransaction(id, data);
  if (!trx) throw new Error("Transaction not found");
  return trx;
};

const deleteTransaction = async (id: string) => {
  const trx = await transactionRepo.deleteTransaction(id);
  if (!trx) throw new Error("Transaction not found");
  return trx;
};

export default {
  createTransaction,
  getTransactionById,
  listTransactions,
  updateTransaction,
  deleteTransaction,
};
