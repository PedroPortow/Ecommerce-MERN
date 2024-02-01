import axios from "axios";
import { useToken } from "./useToken";
import { IProduct } from "@/interfaces/IProduct";

export const useEditProduct = () => {
  const { headers } = useToken();

  const editProduct = async (productId: string, product: IProduct) => {
    try {
      await axios.put(`http://localhost:3001/products/edit/${productId}`, product, { headers });
    } catch (err) {
      console.error("Erro ao editar produto:", err);
      throw err;
    }
  };

  return { editProduct };
};
