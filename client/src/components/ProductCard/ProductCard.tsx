import React from 'react';
import { Card } from '../ui/card';

interface ProductCardProps {
  _id: string;
  productName: string;
  price: number;
  description: string;
  imageUrl: string;
  stockQuantity: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ _id, productName, price, description, imageUrl, stockQuantity }) => {
  return (
    <Card key={_id} >
      <img src={imageUrl} alt={productName} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{productName}</h2>
        <p className="text-gray-700 mb-2">{description}</p>
        <p className="text-gray-900 font-bold">${price.toFixed(2)}</p>
        <p className="text-sm text-gray-600">Stock: {stockQuantity}</p>
      </div>
    </Card>
  );
};

export default ProductCard;
