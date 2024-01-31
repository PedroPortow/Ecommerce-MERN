import axios from "axios";
import { useToken } from "./useToken";
import { IProduct } from "@/interfaces/IProduct";

export const usePostProduct = () => {
  const { headers } = useToken();
  
  const postProduct = async (product: IProduct) => {
    try {
      await axios.post("http://localhost:3001/products/new", product, { headers });
    } catch (err) {
      console.error("Erro ao adicionar produto:", err);
      throw err;
    }
  };

  return { postProduct };
};