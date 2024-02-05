import axios from "axios";
import { useToken } from "./useToken";
import { INewProduct } from "@/interfaces/INewProduct";
import { ICartProduct } from "@/context/ShopContext";

export const usePostCheckout = () => {
  const { headers } = useToken();
  
  const postCheckout = async (cartProducts: ICartProduct[]) => {
    const body = { customerID: localStorage.getItem("userID"), cartProducts };
    try {
      const res = await axios.post(
        "http://localhost:3001/products/checkout",
        body,
        { headers }
      );
      
      return res
    } catch (err) {
      alert(err);
    }
  };

  return { postCheckout };
};