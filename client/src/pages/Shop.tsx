import React from 'react';
import { useGetProducts } from '@/hooks/useGetProducts';
import ProductCard from '@/components/ProductCard/ProductCard';
import { IProduct } from '@/interfaces/IProduct';


const Shop: React.FC = () => {
  const { products } = useGetProducts();
  
  return (
    <div className="p-4 bg-slate-100 min-h-screen">
      <div className="grid container mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {products.map((product: IProduct) => (
          <ProductCard
            key={product._id}
            _id={product._id}
            name={product.name}
            price={product.price}
            description={product.description}
            imageUrl={product.imageUrl}
            stockQuantity={product.stockQuantity}
          />
        ))}
      </div>
    </div>
  );
};

export default Shop;
