import React from 'react';
import { useGetProducts } from '@/hooks/useGetProducts';
import ProductCard from '@/components/ProductCard/ProductCard';
import { IProduct } from '@/interfaces/IProduct';

const Shop: React.FC = () => {
  const { products } = useGetProducts();
  
  return (
    <div className="p-4 bg-slate-100 min-h-screen">
      <div className="flex flex-wrap m04 justify-center gap-y-4"> 
        {products.map((product: IProduct) => (
          <div key={product._id} className="p-2 sm:w-1/2 md:w-1/3 lg:w-1/4"> 
            <ProductCard
              _id={product._id}
              name={product.name}
              price={product.price}
              description={product.description}
              imageUrl={product.imageUrl}
              stockQuantity={product.stockQuantity}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
