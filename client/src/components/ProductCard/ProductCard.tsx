import React, { useContext } from 'react';
import { Card } from '../ui/card';
import { IProduct } from '@/interfaces/IProduct';
import { Button } from '../ui/button';
import { IShopContext, ShopContext } from '@/context/ShopContext';


const ProductCard: React.FC<IProduct> = ({ _id, name, price = 0, description, imageUrl, stockQuantity }) => {
  const { addToCart, getCartProductQuantity} = useContext<IShopContext>(ShopContext)

  const quantity = getCartProductQuantity(_id);

  return (
    <Card key={_id} className='flex w-[360px] flex-col h-full'>
      <img src={imageUrl} alt={name} className="w-full h-48 object-cover rounded-t" />
      <div className="p-4 flex flex-col flex-grow">
        <div className='flex flex-row mb-1 items-center justify-between'>
          <h2 className="text-xl font-semibold">{name}</h2>
          <p className="text-gray-900 font-bold">${String(price.toFixed(2)).replace(".", ",")}</p>
        </div>
        <p className="text-gray-700 mb-2 flex-grow">{description}</p>
        <p className="text-sm text-gray-600 mb-8">Stock: {stockQuantity}</p>
        <div className='flex items-center justify-between mt-auto'> 
          <Button 
            className=''
            onClick={() => addToCart({_id, name, price, description, imageUrl, stockQuantity})}
          >
            Add to Cart
          </Button>
          <p> <i className="fa-solid fa-cart-shopping"></i> {quantity}</p>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
