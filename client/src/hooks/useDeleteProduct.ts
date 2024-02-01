import axios from "axios";
import { useToken } from "./useToken";

export const useDeleteProduct = () => {
  const { headers } = useToken();

  const deleteProduct = async (productId: string | undefined) => {
    try {
      await axios.delete(`http://localhost:3001/products/delete/${productId}`, { headers });
    } catch (err) {
      console.error("Erro ao deletar produto:", err);
      throw err;
    }
  };

  return { deleteProduct };
};
