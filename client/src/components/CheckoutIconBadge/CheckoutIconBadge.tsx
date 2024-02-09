import { IShopContext, ShopContext } from "@/context/ShopContext";
import React, { useContext } from "react";

const CheckoutIconBadge: React.FC = () => {
  const { getCartSize } = useContext<IShopContext>(ShopContext)

  let numberOfItemsInCart = getCartSize();

  return (
    <div className="relative">
      <i className="fa-solid fa-cart-shopping text-xl"></i>
      <span className="absolute top-0 right-6 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs font-semibold rounded-full px-2 py-1">
        {numberOfItemsInCart}
      </span>
    </div>
  );
};

export default CheckoutIconBadge;
