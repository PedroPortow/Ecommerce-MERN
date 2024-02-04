import React, { useContext, useMemo } from 'react';
import { Card } from '../ui/card';
import { IProduct } from '@/interfaces/IProduct';
import { Button } from '../ui/button';
import { IShopContext, ShopContext } from '@/context/ShopContext';


const ProductCard: React.FC<IProduct> = ({ _id, productName, price = 0, description, imageUrl, stockQuantity }) => {
  const { addToCart, getCartProductQuantity} = useContext<IShopContext>(ShopContext)

  const quantity = getCartProductQuantity(_id);

  return (
    <Card key={_id} >
      <img src={imageUrl} alt={productName} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{productName}</h2>
        <p className="text-gray-700 mb-2">{description}</p>
        <p className="text-gray-900 font-bold">${price.toFixed(2)}</p>
        <p className="text-sm text-gray-600">Stock: {stockQuantity}</p>
        <Button onClick={() => addToCart({_id, productName, price, description, imageUrl, stockQuantity})}>
          Add to Cart {quantity > 0 && <span>{quantity}</span>}
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
