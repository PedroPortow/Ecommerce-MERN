import axios from "axios";
import { useState } from "react";
import { useToken } from "./useToken";
import { IProduct } from "@/interfaces/IProduct";

export const useGetProduct = () => {
  const { headers } = useToken();
  const [product, setProduct] = useState<IProduct | null>(null);

  const getProduct = async (productId: string) => {
    try {
      const response = await axios.get(`http://localhost:3001/products/${productId}`, { headers });
      setProduct(response.data);
    } catch (err) {
      console.error("Erro ao buscar produto:", err);
      throw err;
    }
  };

  return { product, getProduct };
};
