import axios from "axios";
import { useEffect, useState } from "react";
import { useToken } from "./useToken";

export const useGetProducts = () => {
  const [products, setProducts] = useState([]);
  const { headers } = useToken();

  console.log({headers})

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3001/products", { headers });
      setProducts(res.data.products);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, fetchProducts };
};