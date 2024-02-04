import axios from "axios";
import { useToken } from "./useToken";
import { INewProduct } from "@/interfaces/INewProduct";

export const usePostProduct = () => {
  const { headers } = useToken();
  
  const postProduct = async (product: INewProduct) => {
    try {
      await axios.post("http://localhost:3001/products/new", product, { headers });
    } catch (err) {
      console.error("Erro ao adicionar produto:", err);
      throw err;
    }
  };

  return { postProduct };
};