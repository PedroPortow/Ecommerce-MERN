import { IProduct } from "@/interfaces/IProduct";
import { createContext, useMemo, useState } from "react";

export interface ICartProduct {
  description: string;
  quantity: number;
  imageUrl?: string;
  price: number;
  name: string;
  _id: string;
}

export interface IShopContext {
  addToCart: (product: IProduct) => void;
  removeFromCart: (productId: string) => void;
  getCartProductQuantity: (productId: string) => number;
  updateCartProductCount: (newAmount: number, productId: string) => void;
  getCartSize: () => number;
  cartProducts: ICartProduct[]; 
}

const defaultValues: IShopContext = {
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartProductCount: () => {},
  getCartProductQuantity: () => 0,
  getCartSize: () => 0,
  cartProducts: []
};

export const ShopContext = createContext<IShopContext>(defaultValues);

export const ShopContextProvider = (props: any) => {
  const [cartProducts, setCartProducts] = useState<ICartProduct[]>(() => {
    const localStorageData = localStorage.getItem('cartProducts');
    return localStorageData ? JSON.parse(localStorageData) : [];
  });

  const getCartProductQuantity = (productId: string): number => {
    return cartProducts.find(cartProduct => cartProduct._id === productId)?.quantity || 0;
  }
  const addToCart = (product: IProduct) => {
    const { stockQuantity, ...productWithoutStockQuantity } = product; 
  
    const productExists = cartProducts.find(cartProduct => cartProduct._id === product._id);
  
    if (productExists) {
      const updatedCartProducts = cartProducts.map(cartProduct =>
        cartProduct._id === product._id
          ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
          : cartProduct
      );
      setCartProducts(updatedCartProducts);
    } else {
      const newProductToAdd: ICartProduct = {
        ...productWithoutStockQuantity,
        quantity: 1 
      };
      setCartProducts([...cartProducts, newProductToAdd]);
    }

    addCartToLocalStorage()
  };

  const addCartToLocalStorage = () => {
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  }
  
  const removeFromCart = (productId: string) => {
    const updatedCartProducts = cartProducts.filter(cartProduct => cartProduct._id !== productId);

    setCartProducts(updatedCartProducts);
    addCartToLocalStorage()
  };

  const updateCartProductCount = (newAmount: number, productId: string) => {
    const updatedCartProducts = cartProducts.map(cartProduct =>
      cartProduct._id === productId
        ? { ...cartProduct, quantity: newAmount }
        : cartProduct
    );
    setCartProducts(updatedCartProducts);
    addCartToLocalStorage()
  };

  const totalQuantity = useMemo(() => cartProducts.reduce((acc, product) => acc + product.quantity, 0), [cartProducts]);
  const getCartSize = () => totalQuantity;

  const providedValues: IShopContext = {
    addToCart,
    removeFromCart,
    updateCartProductCount,
    getCartProductQuantity,
    cartProducts,
    getCartSize
  }

  return (
    <ShopContext.Provider value={providedValues}>
      {props.children}
    </ShopContext.Provider>
  )
}