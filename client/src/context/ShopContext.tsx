import { createContext, useState } from "react";

interface CartProduct {
  productId: string;
  quantity: number;
}

interface IShopContext {
  cartProducts: CartProduct[];
  addToCart: (productId: string, quantity: number) => void;
}

const defaultValues: IShopContext = {
  cartProducts: [],
  addToCart: () => {},
};

export const ShopContext = createContext<IShopContext>(defaultValues);

export const ShopContextProvider = (props: any) => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

  const addToCart = (productId: string, quantity: number = 1) => {
    setCartProducts(prevState => {
      const existingProduct = prevState.find(p => p.productId === productId);

      if (existingProduct) {
        return prevState.map(p => 
          p.productId === productId ? { ...p, quantity: p.quantity + quantity } : p
        );
      } 

      return [...prevState, { productId, quantity }];
    });
  };

  return (
    <ShopContext.Provider value={defaultValues}>
      {props.children}
    </ShopContext.Provider>
  )
}